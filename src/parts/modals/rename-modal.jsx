/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
"use client"

import { useState } from "react"
import { 
    DialogContent,
    Dialog,
    DialogDescription,
    DialogHeader,
    DialogTrigger,
    DialogClose,
    DialogTitle,
    DialogFooter,
    DialogPortal
 } from "../../components/ui/dialog"
import { Input } from "../../components/ui/input"
 import {useRenameModal} from "../../store/use-rename-modal"
import {Button} from "../../components/ui/button"
import { useMutation } from "convex/react"
import { api } from "../../../convex/_generated/api"
import { toast } from "sonner"
import { set } from "date-fns"

export const RenameModal = ({children,orgId,title})=>{
    const [title1, setTitle] = useState(" ");
    const [open, setOpen] = useState(false);

    const update = useMutation(api.board.update);

    const onSubmit=(e)=>{

        e.preventDefault();

        update({ id:orgId , title: title1})
        .then(()=>{
            toast.success("Board renamed");
        }).catch(()=>{
            toast.error("Error renaming board");
        });

    }

    return(
        <Dialog  open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild >
                {children}
            </DialogTrigger>
            <DialogPortal>

                <DialogContent >
                    <DialogHeader>
                        <DialogTitle>
                            Rename board
                        </DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                        Enter a new title
                    </DialogDescription>
                    <form className=" space-y-2" onSubmit={(e)=>{
                        e.preventDefault();
                        update({ id:orgId ,title : title1})
                        .then(()=>{
            toast.success("Board Renamed");
            
            setOpen(false);
            
            
        }).catch(()=>{
            toast.error("Error renaming board");
        });
                    }}>
                        <Input
                            required
                            maxLength={60}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder={title}
                            />
    <DialogFooter>
        <DialogClose asChild>
            <Button type="button " variant="danger">
                Cancel
            </Button>
        </DialogClose>
        <Button type="submit">
            Save
        </Button>
    </DialogFooter>
                    </form>
                </DialogContent>
                            </DialogPortal>
        </Dialog>
    )

    }

    
