/* eslint-disable react/prop-types */
"use client"

import { EmptyFavorites } from "./empty-favorites";
import { EmptySearch } from "./empty-search";
import { EmptyBoards } from "./empty-boards";
 
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { BoardCard } from "../board-card";
import  NewBoardButton from "../board-card/new-board-button"
 export const BoardList = ({query,orgId}) => {

        const data = useQuery(api.boards.get,{ orgId  , ...query})
       

        if (!data?.length && query.favourites) {
          return <EmptyFavorites />
        }
        if (!data?.length && query.search) {
            return <EmptySearch />;
          }
        
        
          if (!data?.length) {
            return <EmptyBoards />
          }

          return(
            <div>
                <h2 className=" text-xl font-semibold">
                {query.favourites? "Favourite Board" : "Team board"}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
                   <NewBoardButton orgId={orgId} disabled={false} />
                    {data?.map((board) => (
                        <BoardCard

                        key={board._id}
                        id={board._id}
                        title={board.title}
                        imageUrl={board.imageUrl}
                        authorId={board.authorId}
                        authorName={board.authorName}
                        createdAt={board._creationTime}
                        orgId={board.orgId}
                        isFavorite={board.isFavorite}
                        
                        />
                    ))}
                </div>
            </div>
          )
      
      
 }