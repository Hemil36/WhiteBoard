/* eslint-disable no-unused-vars */
"use client";

import {api} from "../../../convex/_generated/api"
import note from "../../note.svg"
import {useOrganization} from "@clerk/clerk-react"
import { Button } from "../../components/ui/button";
import {useMutation} from "convex/react"
import { toast } from "sonner";

export const EmptyBoards = () => {
  const { organization } = useOrganization();
  const create = useMutation(api.board.create);

  const onClick = () =>{
    if(!organization) return;

    create({
      orgId : organization?.id,
      title : "NewBoard",}).then(() => {
      toast.success("Board created successfully")
       }).catch((e) => {
      toast.error("Failed to create board")
       })
  }
 
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <img
        src={note}
        height={110}
        width={110}
        alt="Empty"
      />
      <h2 className="text-2xl font-semibold mt-6">
        Create your first board!
      </h2>
      <p className="text-muted-foreground textg-sm mt-2">
        Start by creating a board for your organization
      </p>
      <div className="mt-6">
        <Button onClick={onClick} className=" cursor-pointer"  size="lg">
          Create board
        </Button>
      </div>
    </div>
  );
};
