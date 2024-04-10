import { Loader } from "lucide-react";


export const Loading = ()=>{
    return(
        <main
        className=" h-full w-full absolute bg-neutral-100 touch-none flex items-center justify-center">
            <Loader className=" h-full  text-muted-foreground animate-spin" />
        </main>
    )
}