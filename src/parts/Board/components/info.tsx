"use client"
import React from "react"
import {api} from "../../../../convex/_generated/api.js"
import {useQuery} from "convex/react"
import {cn} from "../../../lib/utils.js"
import {Hint} from "../../sidebar/hint.jsx"
import {Button} from "../../../components/ui/button.jsx"
import { Id } from "convex/_generated/dataModel"
import logo from "../../../logo.png"
import { Link } from "react-router-dom"
import Actions from "../../actions.jsx"
import {Menu} from "lucide-react"
const TabSeparator = () => {
  return (
    <div className="text-neutral-300 px-1.5">
      |
    </div>
  );
};

const Info = ({boardId}) => {

  const data = useQuery(api.board.get,{
      id: boardId as Id<"boards">
  })


  return (
    <div className=" absolute top-2 left-2 rounded-md flex items-center shadow-md z-1000">
       
       <Hint className="font-bold" label="Go to boards" sideOffset={10} >

        <Button asChild variant="board" className=" items-center justify-center gap-x-1">
          <Link to="/">
        <img src={logo} height={40} width={40} className="" />
        <span className={cn(
          " font-extrabold text-xl ml-2 text-black items-center justify-center  ",
          
          )}>
             White Board
            </span>
              </Link>
        </Button>
                </Hint>
                <TabSeparator />
                <div className="text-base font-normal px-2">
                  {data?.title}
                </div>
                <TabSeparator />
                <Actions
        id={data?._id}
        title={data?.title}
        side="bottom"
        sideOffset={10}
      >
        <div>
          <Hint label="Main menu" side="bottom" sideOffset={10}>
            <Button size="icon" variant="board">
              <Menu />
            </Button>
          </Hint>
        </div>
      </Actions>
    </div>
  )
}

export default Info