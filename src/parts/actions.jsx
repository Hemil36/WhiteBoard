/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
"use client";

import { toast } from "sonner";
import { Link2, Pencil, Trash2 } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { ConfirmModal } from "./confirm-modal";
import { RenameModal } from "./modals/rename-modal";
import {useRenameModal} from "../store/use-rename-modal"

const Actions = ({
  children,
  side,
  sideOffset,
  id,
  title,
}) => {

  const onCopyLink = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/board/${id}`,
    )
      .then(() => toast.success("Link copied"))
      .catch(() => toast.error("Failed to copy link"))
  };

  const delete1 = useMutation(api.board.delete1);

  const onDelete = () => {
    delete1({ id })
      .then(() => toast.success("Board deleted"))
      .catch(() => toast.error("Failed to delete board"));
  };

const {isOpen} = useRenameModal();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        onClick={(e) => e.stopPropagation()}
        side="bottom"
        sideOffset={sideOffset}
        className="w-60"
      >
        <DropdownMenuItem
          onClick={onCopyLink}
          className="p-3 cursor-pointer"
        >
          <Link2 className="h-4 w-4 mr-2" />
          Copy board link
        </DropdownMenuItem>

        <ConfirmModal
        header="Delete board?"
        description={`Are you sure you want to delete the board "${title}"?`}
        disabled={false}
        onConfirm={onDelete}
        >

          <Button
            // onClick={onDelete}
            variant="ghost"
            className="p-3 cursor-pointer justify-start w-full font-normal"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Board
          </Button>

        </ConfirmModal>

       
          <RenameModal orgId={id} title={title}>
            
          <Button
            // onClick={onDelete}
            variant="ghost"
            className="p-3 cursor-pointer justify-start w-full font-normal"
          >

          <Pencil className="h-4 w-4 mr-2" />
          Rename Board
          </Button>
          </RenameModal>

      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Actions;