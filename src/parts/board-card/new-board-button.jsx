
import { useMutation } from "convex/react"
import { Plus } from "lucide-react"
import { api } from "../../../convex/_generated/api";
import { toast } from "sonner";

const boardbutton = (props) => {

  const create = useMutation(api.board.create);

  const onClick = () => {
    create({title: "New Board", orgId :props.orgId})
    .then(()=>{
      toast.success("Board created");
    }).catch((e)=>{
      toast.error("Error creating board");
    })
    ;
  }

  return (
    <button onClick={onClick} className=" bg-blue-600 hover:bg-blue-400 items-center justify-center flex flex-col rounded-lg col-span-1" disabled={props.disabled} >



        <Plus className="text-white h-12 w-12 stroke-1 " size={40} />
        <div className=" text-white">
          
          New Board

        </div>

    </button>

  )
}

export default boardbutton