import react, { useEffect } from 'react'
import Sidebar from './Sidebar'
import OrgSidebar from './OrgSidebar'
import Navbar from './navbar'
import PropTypes from 'prop-types';
import axios from 'axios';
import { useOrganization, useUser } from '@clerk/clerk-react';

const Layout = ({ children }) => {
  var org = null;
   org = useOrganization()
  const {user} = useUser();

  useEffect(() => {

    const response  =  axios.post('https://backend-ecru-iota.vercel.app/user',{
        orgId :  org?.organization?.id || " " ,
        user

          
    },{
      headers:{
        'Content-Type':'application/json'
      }
    })


  })


  return (
    <div className=' h-full' >
      <Sidebar />
      <div className='pl-[60px] h-full'>
        <div className='flex gap-x-1 h-full'>

        <OrgSidebar />
          <div className=' h-full flex-1'>
            <Navbar />

            {children}

          </div>
        </div>

      </div>
    </div>
  )

}

export default Layout