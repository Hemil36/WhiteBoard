"use client"
import { OrganizationSwitcher } from "@clerk/clerk-react"
import image from "../../logo.png"
import { LayoutDashboard,Star } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Link, useSearchParams } from "react-router-dom"
const OrgSidebar = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const favourites = searchParams.get('favourites');

  return (
    <div className=' hidden lg:flex flex-col space-y-6 w-[206px] pl-5 pt-5  h-screen -space-x-1'>
      <div className=" flex  place-items-center gap-x-1">
        <img src={image} alt="logo" height={60} width={60} />
        <p className=" space-x-1 font-semibold poppins-semibold text-md ">White Board </p>
      </div>
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
              },
              rootBox: {
                justifyContent: "center",
                width: "100%",
              }
            }
          }


        } />

      <div className=" w-full space-y-2 ">

        <Button variant={favourites ? "ghost" : "secondary"} size="lg" className="font-semibold justify-start w-full px-2" >

          <Link to="/"  >
            <div className=" flex flex-row w-full items-center">


              <LayoutDashboard className=" h-4 w-4 mr-2" />
              <div>

                Team Board
              </div>

            </div>
          </Link>
        </Button>


        <div className=" w-full -space-y-2">

          <Button variant={favourites ? "secondary" : "ghost"} size="lg" className="font-semibold justify-start w-full px-2 " >
            <Link to={{
              pathname: "/",
              search: '?favourites=true',

            }}  >
              <div className=" flex   w-full  items-center">
                <Star className="h-4 w-4 mr-2" />
                <div>
                  Favourite Boards

                </div>
              </div>
            </Link>
          </Button>


        </div>
      </div>
    </div>
  )
}

export default OrgSidebar