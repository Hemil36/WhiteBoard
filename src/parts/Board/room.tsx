/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
"use client";

import { ReactNode } from "react";
import { ClientSideSuspense } from "@liveblocks/react";
import { LiveMap , LiveList,LiveObject} from "@liveblocks/client";
import { Layer } from "@/types/canvas.js";
import React from "react";
import { RoomProvider } from "../../../liveblocks.config.ts";
import { Loading } from "./loading.jsx";


export const Room = ({ 
  children,
  roomId,
  fallback,
}) => {
  return (
    <RoomProvider 
      id={roomId} 
      initialPresence={{
          cursor: null, 
          selection : [],
          pencilDraft: null,
        penColor: null,

      }}

      initialStorage={{
        layers: new LiveMap<string , LiveObject<Layer>>(),
        layerIds : new LiveList(),
      }}
    >
      <ClientSideSuspense fallback={<Loading />}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  );
};