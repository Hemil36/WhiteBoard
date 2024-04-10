import {useAuth, useOrganization, useUser} from "@clerk/clerk-react"

import axios from 'axios';


async function PO (room){
    


    var response = await axios.post("https://backend-ecru-iota.vercel.app/auth",{
        // user : useAuth(),
        room
    },{
      
        headers :
            {"Content-Type": "application/json"}
            
    })

    // console.log(response.data)
   

    return response.data;

}

export default PO;
