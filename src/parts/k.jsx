import { useOrganization } from "@clerk/clerk-react";

export const Auth=()=>{

    const { organization } = useOrganization();
    
  
    const token ={ "token" :" kmkmkmkm"}
  
    return (
      <div>
        organization
      </div>
    )
    ;
  }

