"use client";

import { memo } from "react";

import { Color, LayerType } from "@/types/canvas";
import { useStorage } from "../../../../liveblocks.config";
import { Rectangle } from "./rectangle";
import React from "react";
import { Text } from "./text";
import { Note } from "./note";
import { Path } from "./path";
import { Ellipse } from "./ellipse";
// import { Path } from "./path";

function colorToCss(color: Color) {
  return `#${color.r.toString(16).padStart(2, "0")}${color.g.toString(16).padStart(2, "0")}${color.b.toString(16).padStart(2, "0")}`;
}

interface LayerPreviewProps {
  id: string;
  onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void;
  selectionColor?: string;
};

export const LayerPreview = memo(({
  id,
  onLayerPointerDown,
  selectionColor,
}: LayerPreviewProps) => {
  const layer = useStorage((root) => root.layers.get(id));

  if (!layer) {
    return null;
  }

  switch (layer.type) {


    case LayerType.Path:
      return (
        <Path
          key={id}
          points={layer.points}
          onPointerDown={(e) => onLayerPointerDown(e, id)}
          x={layer.x}
          y={layer.y}
          fill={layer.fill ? colorToCss(layer.fill) : "#000"}
          stroke={selectionColor}
        />
      );
    case LayerType.Note:
      return (
        <Note
          id={id}
          layer={layer}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
        />
      );
    case LayerType.Text:
      return (
        <Text
          id={id}
          layer={layer}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
        />
      );
    case LayerType.Ellipse:
      return (
        <Ellipse
          id={id}
          layer={layer}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
        />
      );
    case LayerType.Rectangle:
      return (
        <Rectangle
          id={id}
          layer={layer}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
        />
      );
    default:
      console.warn("Unknown layer type");
      return null;
      
  }

});

LayerPreview.displayName = "LayerPreview";