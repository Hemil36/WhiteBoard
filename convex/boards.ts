import { v } from "convex/values";

import { query } from "./_generated/server";

import { getAllOrThrow } from "convex-helpers/server/relationships";

export const get = query({
  args: {
    orgId: v.string(),
    search: v.optional(v.string()),
    favourites: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    let boards: any[] = [];
    if (!identity) {
      throw new Error("Unauthorized");
    }

    if(args.favourites){
      const favourites = await ctx.db
      .query("userFavourites")
      .withIndex("by_user_org", (q) =>
        q.eq("userId", identity.subject)
        .eq("orgId", args.orgId)
      )
      .order("desc")
      .collect();

      const ids = favourites.map((favourite) => favourite.boardId);
      const boards = await getAllOrThrow(ctx.db,  ids);
      return boards.map((board) => {
        return {
          ...board,
          isFavorite: true,
        }
      });
    }


    const title = args.search as string;
    if (title) {
      boards = await ctx.db
        .query("boards")
        .withSearchIndex("search_title", (q) =>
          q.search("title", title).eq("orgId", args.orgId)
        ) 
        .collect();
    } else {
      boards = await ctx.db
        .query("boards")
        .withIndex("by_org", (q) => q.eq("orgId", args.orgId))
        .order("desc")
        .collect();
    }

    const boardsWithFavoriteRelation = boards.map((board) => {
      return ctx.db
        .query("userFavourites")
        .withIndex("by_user_board", (q) =>
          q.eq("userId", identity.subject).eq("boardId", board._id)
        )
        .unique()
        .then((favorite) => {
          return {
            ...board,
            isFavorite: !!favorite,
          };
        });
    });

    const boardsWithFavoriteBoolean = Promise.all(boardsWithFavoriteRelation);

    return boardsWithFavoriteBoolean;
  },
});
