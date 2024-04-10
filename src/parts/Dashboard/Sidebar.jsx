/* eslint-disable no-unused-vars */
import React from 'react'
import Button from '../sidebar/new-button'
import { Authenticated  } from 'convex/react';
// eslint-disable-next-line no-unused-vars
import {List} from "../sidebar/list"
import { SignedIn } from '@clerk/clerk-react';
const Sidebar = ()=>{
    return (
        <aside className=' fixed z-[1] left-0 bg-blue-950 h-full w-[60px] flex p-3 flex-col gap-y-4 text-white text-[0.9rem]'>
            
            <List />
            <Button />
            
        </aside>
    )
}

export default Sidebar;