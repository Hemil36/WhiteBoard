/* eslint-disable react/prop-types */
"use client"

import { useOrganizationList ,useOrganization } from "@clerk/clerk-react"

import {cn } from "../../lib/utils"
import { Hint } from "./hint";

export const Item = ({id,name,imageUrl,})=>{
    const {organization }= useOrganization();
    const {setActive} = useOrganizationList();

    const isActive = organization?.id === id;
    const onClick = ()=>{
        setActive({organization : id});
    }

        return(
            <div className="">
                <Hint label={name} side="right" sideOffset={14}>

                <img  alt={name}
                src={imageUrl}
                onClick={onClick}
                className={cn("rounded-md cursor-pointer  opacity-75 hover:opacity-100 transition ", isActive &&"opacity-100")} />
                </Hint>
            </div>

        )
}