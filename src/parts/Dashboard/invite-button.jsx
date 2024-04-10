import { Plus } from "lucide-react";
import { OrganizationProfile } from "@clerk/clerk-react";

import {
    Dialog,
    DialogContent,
    DialogTrigger
} from "../../components/ui/dialog"


import {Button} from "../../components/ui/button"

const InviteButton = () => {
    return (
        <div >

        <Dialog className="text-black ">

        <DialogTrigger asChild>
            <Button  className="bg-primary-500 text-black" variant="outline">
                <Plus className="w-4 h-4 mr-2 " />
                Invite members
            </Button>
        </DialogTrigger>
            <DialogContent className=" bg-transparent border-none max-w-[900px]  p-0 space-y-2">
                    <OrganizationProfile />
            </DialogContent>
        </Dialog>
        </div>
    );
}

export default InviteButton;