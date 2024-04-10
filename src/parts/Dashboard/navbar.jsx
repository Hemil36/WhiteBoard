"use client"
import React from 'react'
import { UserButton ,OrganizationSwitcher,  useOrganization} from '@clerk/clerk-react'
import { SearchInput } from './search-input'
import InviteButton from "./invite-button"



const navbar = () => {
  const {organization} = useOrganization();
  return (
    <div className="flex items-center gap-x-4 p-5 ">
      <div className="hidden lg:flex  lg:flex-1">
          <SearchInput />
      </div>
      <div className=' block lg:hidden flex-1'>
      <OrganizationSwitcher
        appearance={

          {
            elements: {
              organizationSwitcherTrigger: {
                padding: "6px",
                borderRadius: "10px",
                justifyContent: "space-between",
                width: "100%",
                border: "1px solid #E5E5E5",
                maxWidth: "516px"
              },
              rootBox: {
                justifyContent: "center",
                width: "100%",
              }
            }
          }


        } />
      </div>
      {
        organization && <InviteButton />
      }


      <UserButton />
    </div>
  )
}

export default navbar