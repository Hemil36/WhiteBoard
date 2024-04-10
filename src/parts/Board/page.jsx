
import {Canvas} from "./components/canvas.tsx"
import queryString from 'query-string';
import { useAuth, useOrganization , useUser} from "@clerk/clerk-react";
import axios from "axios"
import { Room } from "./room.tsx";
import {useParams} from 'react-router-dom'
import { useEffect } from "react";
const Page = () => {

  const {organization} = useOrganization()
  const {userId} = useAuth()
  const {user} = useUser();
  useEffect(() => {

    const response  =  axios.post('https://backend-ecru-iota.vercel.app/user',{
      orgId :   organization?.id || " ",
        user: user
          
    },{
      headers:{
        'Content-Type':'application/json'
      }
    })


  })
  let { id } = useParams();
  return (
      <Room roomId={id} >

        <Canvas boardId={id}  />
      </Room>
  )
}

export default Page