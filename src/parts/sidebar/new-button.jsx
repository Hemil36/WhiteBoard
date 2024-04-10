/* eslint-disable no-unused-vars */
"use client";
import React from 'react'

import {Plus} from "lucide-react"
import {CreateOrganization, SignedIn } from "@clerk/clerk-react"
import { Authenticated } from 'convex/react';

import {Dialog,DialogTrigger,DialogContent} from '../../components/ui/dialog';
import {Hint} from './hint'




const Button = () => {
  return (
    
    <Dialog> 
        <DialogTrigger asChild   >
            <div className=' aspect-square '>
              <Hint label="Create Organization" side="right" sideOffset={10}>

            <button className=' bg-white/25 h-full w-full rounded-md flex items-center justify-center opacity-60 hover:opacity-100 transition ' >
            <Plus size={24} />
            </button>
              </Hint>
            </div>


        </DialogTrigger>
        <DialogContent className=" p-0 bg-transparent border-none max-w-[480px]" >
            <CreateOrganization />
        </DialogContent>
    </Dialog>
  )
}

export default Button