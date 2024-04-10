"use client";

import { memo } from "react";
import { shallow } from "@liveblocks/client";
import React from "react";
import { 
  useOthersConnectionIds, 
  useOthersMapped
} from "../../../../liveblocks.config";

import { Cursor } from "./cursor";
import { Path } from "./path";
import { Color } from "@/types/canvas";
// import { Path } from "./path";
function colorToCss(color: Color) {
  return `#${color.r.toString(16).padStart(2, "0")}${color.g.toString(16).padStart(2, "0")}${color.b.toString(16).padStart(2, "0")}`;
}
const Drafts = () => {


  const others = useOthersMapped((other) => ({
    pencilDraft: other.presence.pencilDraft,
    penColor: other.presence.penColor,
  }), shallow);

  return (
    <>
      {others.map(([key, other]) => {
        if (other.pencilDraft) {
          return (
            <Path
              key={key}
              x={0}
              y={0}
              points={other.pencilDraft}
              fill={other.penColor ? colorToCss (other.penColor) : "#000"}
            />
          );
        }

        return null;
      })}
    </>
  )
}
const Cursors = () => {
  const ids = useOthersConnectionIds();

  return (
    <>
      {ids.map((connectionId) => (
        <Cursor
          key={connectionId}
          connectionId={connectionId}
        />
      ))}
    </>
  );
};



export const CursorsPresence = memo(() => {
  return (
    <>
      <Drafts />
      <Cursors />
    </>
  );
});

CursorsPresence.displayName = "CursorsPresence";