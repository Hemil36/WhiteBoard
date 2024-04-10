"use client"
import React, { useEffect } from 'react'
import { useOrganization } from '@clerk/clerk-react'
import queryString from 'query-string';
import { useSearchParams } from 'react-router-dom'
import {EmptyOrg} from './empty-org'
import { BoardList } from './board-list';
import axios from 'axios';


const Dashboardpage = () => {

  // let query = useQuery();
  const { organization } = useOrganization();

  const [params, setParams] = useSearchParams();
  var parsed = queryString.parse(params.toString());


useEffect(() => {

  


   parsed = queryString.parse(params.toString());
  console.log(parsed)
}, [params])

  
  return (
    <div className=' h-screen p-5'>
      {!organization ? 
      <EmptyOrg /> 
    :
    

    <BoardList query={parsed} orgId={organization.id} />
  }
      
    </div>
  )
}

export default Dashboardpage