import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from "../../components/ui/tooltip";

export  const Hint = ({  
   
    children,
    side,
    align,
    label,
    sideOffset
}
)=>{
    return (
    <TooltipProvider>
        <Tooltip delayDuration={100}>
            <TooltipTrigger asChild>
                {children}
            </TooltipTrigger>
            <TooltipContent side={side} align={align} sideOffset={sideOffset} className=" bg-black text-white border-black" >
                <p className="">
                    {label}
                </p>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
    )
}