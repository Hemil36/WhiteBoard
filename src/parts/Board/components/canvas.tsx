/* eslint-disable react/prop-types */
"use client";
import {
  useHistory,
  useSelf,
  useCanUndo,
  useCanRedo,
  useMutation,
  useStorage,
  useOthersMapped,
} from "../../../../liveblocks.config";
import Info from "./info";
import Participants from "./participants";
import { Toolbar } from "./toolbar";
import React, { useCallback, useEffect, useMemo } from "react";
import { useState } from "react";
import {
  Camera,
  CanvasMode,
  CanvasState,
  Color,
  Layer,
  LayerType,
  Point,
  Side,
  XYWH,
} from "../../../types/canvas";
import { CursorsPresence } from "./cursor-presence";
import { nanoid } from "nanoid";
import { LiveObject } from "@liveblocks/client";
import { connectionIdToColor } from "@/lib/utils.js";
import { LayerPreview } from "./layer-preview";
import { SelectionBox } from "./selection-box";
import { resizeBounds } from "./resize";
import { SelectionTools } from "./selection-tools";
import { findIntersectingLayersWithRectangle } from "./intersecting-layer";
import { penPointsToPathLayer } from "./penpoints";
import { Path } from "./path";
import { useDeleteLayers } from "./use-delete-layers";

export const Canvas = ({ boardId }) => {
  const layerIds = useStorage((root) => root.layerIds);

  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();
  function colorToCss(color: Color) {
    return `#${color.r.toString(16).padStart(2, "0")}${color.g
      .toString(16)
      .padStart(2, "0")}${color.b.toString(16).padStart(2, "0")}`;
  }
  const [usedcolor, setLastUsedColor] = useState<Color>({
    r: 255,
    b: 255,
    g: 255,
  });

  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });

  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });

  const insertLayer = useMutation(
    (
      { storage, setMyPresence },
      layerType:
        | LayerType.Ellipse
        | LayerType.Rectangle
        | LayerType.Text
        | LayerType.Note
        | LayerType.Path,
      position: Point
    ) => {
      const livelayer = storage.get("layers");
      if (livelayer.size >= 100) return;

      const livelayerId = storage.get("layerIds");
      const layerid = nanoid();

      const layer = new LiveObject({
        type: layerType,
        x: position.x,
        y: position.y,
        height: 100,
        width: 100,
        fill: usedcolor,
      });

      livelayerId.push(layerid);
      livelayer.set(layerid, layer);

      setMyPresence({ selection: [layerid] }, { addToHistory: true });
      setCanvasState({ mode: CanvasMode.None });
    },
    []
  );
  const pencilDraft = useSelf((me) => me.presence.pencilDraft);

  const updateSelectionNet = useMutation(
    ({ storage, setMyPresence }, current: Point, origin: Point) => {
      const layers = storage.get("layers").toImmutable();
      setCanvasState({
        mode: CanvasMode.SelectionNet,
        origin,
        current,
      });

      const ids = findIntersectingLayersWithRectangle(
        layerIds,
        layers,
        origin,
        current
      );

      setMyPresence({ selection: ids });
    },
    [layerIds]
  );

  const startMultiSelection = useCallback((current: Point, origin: Point) => {
    if (Math.abs(current.x - origin.x) + Math.abs(current.y - origin.y) > 5) {
      setCanvasState({
        mode: CanvasMode.SelectionNet,
        origin,
        current,
      });
    }
  }, []);

  const unselectedLayer = useMutation(({ self, setMyPresence }) => {
    if (self.presence.selection.length > 0) {
      setMyPresence({ selection: [] }, { addToHistory: true });
    }
  }, []);

  const startDrawing = useMutation(
    ({ setMyPresence }, point: Point, pressure: number) => {
      setMyPresence({
        pencilDraft: [[point.x, point.y, pressure]],
        penColor: usedcolor,
      });
    },
    [usedcolor]
  );

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      const point = { x: e.clientX - camera.x, y: e.clientY - camera.y };

      if (canvasState.mode === CanvasMode.Inserting) {
        return;
      }
      if (canvasState.mode === CanvasMode.Pencil) {
        startDrawing(point, e.pressure);
        return;
      }

      setCanvasState({ origin: point, mode: CanvasMode.Pressing });
    },
    [camera, canvasState.mode, setCanvasState, startDrawing]
  );
  const insertPath = useMutation(
    ({ storage, self, setMyPresence }) => {
      const liveLayers = storage.get("layers");
      const { pencilDraft } = self.presence;

      if (
        pencilDraft == null ||
        pencilDraft.length < 2 ||
        liveLayers.size >= 100
      ) {
        setMyPresence({ pencilDraft: null });
        return;
      }

      const id = nanoid();
      liveLayers.set(
        id,
        new LiveObject(penPointsToPathLayer(pencilDraft, usedcolor))
      );

      const liveLayerIds = storage.get("layerIds");
      liveLayerIds.push(id);

      setMyPresence({ pencilDraft: null });
      setCanvasState({ mode: CanvasMode.Pencil });
    },
    [usedcolor]
  );

  const onPointerUp = useMutation(
    ({}, e) => {
      const point = { x: e.clientX - camera.x, y: e.clientY - camera.y };

      if (canvasState.mode === CanvasMode.Pressing) {
        unselectedLayer();
        console.log("unselecting");
        setCanvasState({ mode: CanvasMode.None });
      } else if (canvasState.mode === CanvasMode.Pencil) {
        insertPath();
      } else if (canvasState.mode === CanvasMode.Inserting) {
        insertLayer(canvasState.layerType, point);
      } else {
        setCanvasState({
          mode: CanvasMode.None,
        });
      }

      history.resume();
    },
    [
      setCanvasState,
      camera,
      canvasState,
      history,
      insertLayer,
      unselectedLayer,
      insertPath,
    ]
  );

  const onLayerPointerDown = useMutation(
    ({ self, setMyPresence }, e: React.PointerEvent, layerId: string) => {
      if (
        canvasState.mode === CanvasMode.Pencil ||
        canvasState.mode === CanvasMode.Inserting
      ) {
        return;
      }

      history.pause();
      e.stopPropagation();

      const point = { x: e.clientX - camera.x, y: e.clientY - camera.y };

      if (!self.presence.selection.includes(layerId)) {
        setMyPresence({ selection: [layerId] }, { addToHistory: false });
      }

      setCanvasState({ mode: CanvasMode.Translating, current: point });
    },
    [setCanvasState, camera, history, canvasState.mode]
  );

  const translateSelectedLayer = useMutation(
    ({ storage, self }, point: Point) => {
      if (canvasState.mode !== CanvasMode.Translating) {
        return;
      }

      const dxdy = {
        x: point.x - canvasState.current.x,
        y: point.y - canvasState.current.y,
      };

      const livelayer = storage.get("layers");

      const layer = livelayer.get(self.presence.selection[0]);

      if (layer) {
        layer.update({
          x: layer.get("x") + dxdy.x,
          y: layer.get("y") + dxdy.y,
        });

        setCanvasState({ mode: CanvasMode.Translating, current: point });
      }
    },
    [canvasState, camera]
  );

  const continueDrawing = useMutation(
    ({ self, setMyPresence }, point: Point, e: React.PointerEvent) => {
      const { pencilDraft } = self.presence;

      if (
        canvasState.mode !== CanvasMode.Pencil ||
        e.buttons !== 1 ||
        pencilDraft == null
      ) {
        return;
      }

      setMyPresence({
        cursor: point,
        pencilDraft:
          pencilDraft.length === 1 &&
          pencilDraft[0][0] === point.x &&
          pencilDraft[0][1] === point.y
            ? pencilDraft
            : [...pencilDraft, [point.x, point.y, e.pressure]],
      });
    },
    [canvasState.mode]
  );

  const onpointerleave = useMutation(
    ({ setMyPresence }, e: React.PointerEvent) => {
      e.preventDefault();

      setMyPresence({ cursor: null });
    },
    []
  );

  const onWheel = useCallback((e: React.WheelEvent) => {
    console.log(e.deltaX, e.deltaY);
    setCamera((camera) => ({
      x: camera.x - e.deltaX,
      y: camera.y - e.deltaY,
    }));
  }, []);

  const selections = useOthersMapped((other) => other.presence.selection);

  const layerIdToColorSelection = useMemo(() => {
    const layerIdToColorSelection: Record<string, string> = {};

    for (const user of selections) {
      const [connnectionId, selection] = user;

      for (const layerId of selection) {
        layerIdToColorSelection[layerId] = connectionIdToColor(connnectionId);
      }
    }

    return layerIdToColorSelection;
  }, [selections]);

  const onResizeHandlePointerDown = useCallback(
    (corner: Side, initialBounds: XYWH) => {
      history.pause();
      setCanvasState({
        mode: CanvasMode.Resizing,
        initialBounds,
        corner,
      });
    },
    [history]
  );

  const resizeSelectedLayer = useMutation(
    ({ storage, self }, point: Point) => {
      if (canvasState.mode !== CanvasMode.Resizing) {
        return;
      }

      const bounds = resizeBounds(
        canvasState.initialBounds,
        canvasState.corner,
        point
      );

      const livelayer = storage.get("layers");
      const layer = livelayer.get(self.presence.selection[0]);

      if (layer) layer.update(bounds);
    },
    [canvasState]
  );
  const onPointerMove = useMutation(
    ({ setMyPresence }, e: React.PointerEvent) => {
      e.preventDefault();

      const current = {
        x: Math.round(e.clientX) - camera.x,
        y: Math.round(e.clientY) - camera.y,
      };

      if (canvasState.mode === CanvasMode.Pressing) {
        startMultiSelection(current, canvasState.origin);
      } else if (canvasState.mode === CanvasMode.SelectionNet) {
        updateSelectionNet(current, canvasState.origin);
      } else if (CanvasMode.Translating === canvasState.mode) {
        translateSelectedLayer(current);
      } else if (CanvasMode.Resizing === canvasState.mode) {
        resizeSelectedLayer(current);
      } else if (canvasState.mode === CanvasMode.Pencil) {
        continueDrawing(current, e);
      }

      setMyPresence({ cursor: current });
    },
    [
      continueDrawing,
      camera,
      canvasState,
      resizeSelectedLayer,
      translateSelectedLayer,
      startMultiSelection,
      updateSelectionNet,
    ]
  );
const deleteLayers = useDeleteLayers();
  
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      switch (e.key) {
        // case "Backspace":
        //   deleteLayers();
        //   break;
        case "z": {
          if (e.ctrlKey || e.metaKey) {
            if (e.shiftKey) {
              history.redo();
            } else {
              history.undo();
            }
            break;
          }
        }
      }
    }

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [deleteLayers, history]);

  return (
    <main className="h-[100%] w-[100%] relative bg-neutral-100 touch-none">
      <Info boardId={boardId} />
      <Participants />
      <Toolbar
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        canRedo={canRedo}
        canUndo={canUndo}
        undo={history.undo}
        redo={history.redo}
        setLastUsedColor={setLastUsedColor}
        
      />
      <SelectionTools camera={camera} setLastUsedColor={setLastUsedColor} />
      <svg
        className="h-[100vh] w-[100vw]"
        onWheel={onWheel}
        onPointerMove={onPointerMove}
        onPointerLeave={onpointerleave}
        onPointerUp={onPointerUp}
        onPointerDown={onPointerDown}
      >
        <g
          style={{
            transform: `translate(${camera.x}px, ${camera.y}px)`,
          }}
        >
          {layerIds.map((layerId) => (
            <LayerPreview
              key={layerId}
              id={layerId}
              onLayerPointerDown={onLayerPointerDown}
              selectionColor={layerIdToColorSelection[layerId]}
            />
          ))}
          <SelectionBox onResizeHandlePointerDown={onResizeHandlePointerDown} />
          {canvasState.mode === CanvasMode.SelectionNet &&
            canvasState.current != null && (
              <rect
                className="fill-blue-500/5 stroke-blue-500 stroke-1"
                x={Math.min(canvasState.origin.x, canvasState.current.x)}
                y={Math.min(canvasState.origin.y, canvasState.current.y)}
                width={Math.abs(canvasState.origin.x - canvasState.current.x)}
                height={Math.abs(canvasState.origin.y - canvasState.current.y)}
              />
            )}
          <CursorsPresence />
          {pencilDraft != null && pencilDraft.length > 0 && (
            <Path
              points={pencilDraft}
              fill={colorToCss(usedcolor)}
              x={0}
              y={0}
            />
          )}
        </g>
      </svg>
    </main>
  );
};

export default Canvas;
