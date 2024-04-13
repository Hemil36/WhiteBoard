"use client";

import { LucideIcon } from "lucide-react";
import React from "react";
import { Hint } from "../../sidebar/hint";
import { Button } from "@/components/ui/button";
import { CanvasMode, Color } from "@/types/canvas";
import { ColorPicker } from "./color-picker";
import { useMutation } from "../../../../liveblocks.config";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { ColorPicker1 } from "./color-picker1";


interface ToolButtonProps {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  isActive?: boolean;
  isDisabled?: boolean;
  mode: CanvasMode;
  setLastUsedColor: (color: Color) => void;

  
};


export const ToolButton1 = ({
  label,
  icon: Icon,
  onClick,
  isActive,
  isDisabled,
  mode,
  setLastUsedColor
  
}: ToolButtonProps) => {
  const setFill = useMutation((
    { storage },
    fill: Color,
  ) => {
    setLastUsedColor(fill);
  

  }, [ setLastUsedColor]);
  return (
    <div>


    {
        mode === CanvasMode.Pencil ? 
            <>
            <HoverCard >
  <HoverCardTrigger asChild>
   
            <Button
        disabled={isDisabled}
        onClick={onClick}
        size="icon"
        variant={isActive ? "boardActive" : "board"}
        
        >
        <Icon />
      </Button>
    </HoverCardTrigger>
  <HoverCardContent sideOffset={10} side="right" sticky="always">
    <ColorPicker1
      onChange={(color) => {
        setFill(color);
      }}
    />
  </HoverCardContent>

          </HoverCard>
            </>
         : <>
    <Hint label={label} side="right" sideOffset={14}>
      <Button
        disabled={isDisabled}
        onClick={onClick}
        size="icon"
        variant={isActive ? "boardActive" : "board"}
        >
        <Icon />
      </Button>
    </Hint>
         </>
        
    }


          </div>
  );
};