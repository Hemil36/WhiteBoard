import React from 'react';

import ClerkReact from '@clerk/clerk-react';


const Top = ()=>{

const {organization} = ClerkReact.useOrganization();

    return organization;

}

export default Top;