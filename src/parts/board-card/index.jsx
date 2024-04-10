/* eslint-disable react/prop-types */
"use client"
import { Link } from "react-router-dom"
import Overlay from "./Overlay"
import { formatDistanceToNow } from "date-fns"
import { useAuth } from "@clerk/clerk-react"
import Footer from "./Footer"
import Actions from "../actions"
import { MoreHorizontal } from "lucide-react"
import { api } from "../../../convex/_generated/api"
import { useMutation } from "convex/react";
import { toast } from "sonner"

export const BoardCard = ({ id,
    title,
    authorId,
    authorName,
    createdAt,
    imageUrl,
    orgId,
    isFavorite}) => {

    const { userId } = useAuth();

    const authorLabel = userId == authorId ? "You" : authorName;
    const createdAtLabel = formatDistanceToNow(createdAt, { addSuffix: true });

    const Onfavourite = useMutation(api.board.favourite);
      const unfavourite = useMutation(api.board.unfavourite);
    const onFavourite = () => {
      if(isFavorite){
        unfavourite({ id }).then(()=>{
          toast.success("Board removed from  favourites");
        }).catch(()=>{
          toast.error("Failed to remove board to favourites")
        });
    }else{
        Onfavourite({ id,orgId }).then(()=>{
          toast.success("Board added to favourites");
        }).catch(()=>{
          toast.error("Already Favourite")
        });
    }

  }
    return (
        <Link to={`/board/${id}`}>
      <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
        <div className="relative flex-1 bg-amber-50">
        <img
            src={imageUrl}
            alt={title}
            className="object-fit absolute h-full"

        />
          <Overlay />
          <Actions
            id={id}
            title={title}
            side="right"
          >
            <button
              className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none"
            >
              <MoreHorizontal
                className="text-white opacity-75 hover:opacity-100 transition-opacity"
              />
            </button>
          </Actions>
        </div>
        <Footer
          isFavorite={isFavorite}
          title={title}
          authorLabel={authorLabel}
          createdAtLabel={createdAtLabel}
          disabled={false}
          onClick={onFavourite}
        />
      </div>
    </Link>
  
    )
}