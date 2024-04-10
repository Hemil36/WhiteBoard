import { Color, NoteLayer } from "@/types/canvas";

import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import React from "react";
import { cn } from "../../../lib/utils";
import { useMutation } from "../../../../liveblocks.config";

function getContrastingTextColor(color: Color) {
   const luminance = 0.299 * color.r + 0.587 * color.g + 0.114 * color.b;
 
   return luminance > 182 ? "black" : "white";
 };
 

const convert = (color : Color)=>{

    return `#${color.r.toString(16).padStart(2, "0")}${color.g.toString(16).padStart(2, "0")}${color.b.toString(16).padStart(2, "0")}`;
  
  }
const calculateFontSize = (width: number, height: number) => {
  const maxFontSize = 96;
  const scaleFactor = 0.5;
  const fontSizeBasedOnHeight = height * scaleFactor;
  const fontSizeBasedOnWidth = width * scaleFactor;

  return Math.min(
    fontSizeBasedOnHeight, 
    fontSizeBasedOnWidth, 
    maxFontSize
  );
}

interface TextProps {
  id: string;
  layer: NoteLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
};

export const Note = ({
  layer,
  onPointerDown,
  id,
  selectionColor,
}: TextProps) => {
  const { x, y, width, height, fill, value } = layer;

  const updateValue = useMutation((
    { storage },
    newValue: string,
  ) => {
    const liveLayers = storage.get("layers");

    liveLayers.get(id)?.set("value", newValue);
  }, []);

  const handleContentChange = (e: ContentEditableEvent) => {
    updateValue(e.target.value);
  };

  return (
    <foreignObject
      x={x}
      y={y}
      width={width}
      height={height}
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{
        outline: selectionColor ? `1px solid ${selectionColor}` : "none",
        backgroundColor: fill ? convert(fill) : "#000",
      }}
    >


    <ContentEditable
       html = {value || "Text"}
        onChange={handleContentChange}
        className={cn(
            "h-full w-full flex items-center justify-center text-center drop-shadow-md outline-none caveat"
        )}
        style={{
            fontSize: calculateFontSize(width, height),
            color: fill ? getContrastingTextColor(fill) : "#000",
        }}
    >
    </ContentEditable>
    </foreignObject>
  );
};
