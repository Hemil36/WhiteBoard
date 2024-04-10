/* eslint-disable no-unused-vars */
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { AuthLoading, Authenticated,  ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";

import { AuthenticateWithRedirectCallback, ClerkProvider, SignInButton, useAuth ,SignOutButton, SignedIn, SignedOut, RedirectToSignIn} from '@clerk/clerk-react';
import { Loading } from './loading';
import Layout from "./parts/Dashboard/layout.jsx"
import Dashboardpage from "./parts/Dashboard/dashboardpage.jsx"
import  ErrorPage  from './Error.jsx';
import { BrowserRouter, Outlet, Route, RouterProvider, Routes, createBrowserRouter } from 'react-router-dom'
import { Toaster } from './components/ui/sonner.jsx';
import Page from "./parts/Board/page.jsx"
const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/board/:id",
        element: <>
                  <Page />
        </>
      },{
        path:"/",
        element: <>
               <Layout >
                  <Dashboardpage />
                </Layout>
        </>
      }
    ]
  }
])



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
         <Toaster />
          <SignedOut>

              <RedirectToSignIn />
          </SignedOut>
          <Authenticated>

          <RouterProvider router={router} />

          </Authenticated>

        <AuthLoading >
          <Loading />
        </AuthLoading>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  </React.StrictMode>,
)
