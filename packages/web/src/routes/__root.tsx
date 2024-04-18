import { Outlet, Link } from "@tanstack/react-router";

import { type QueryClient } from "@tanstack/react-query";

import { createRootRouteWithContext } from "@tanstack/react-router";

import { NotFound } from "@/components/not-found";
import { CgProfile } from "react-icons/cg";

import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import  Logo  from "@/components/ui/logo";
export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: RootLayout,
  notFoundComponent: NotFound,
});

function RootLayout() {
  const { isAuthenticated } = useKindeAuth();
  return (
    <>
      <div className="py-2 flex max-w-2xl mx-auto justify-between items-center ">
        <Link to="/" className="text-2xl">
        <Logo />
        </Link>
        <div className="flex gap-x-4 items-center">
  <Link to="/AllJobs" className="inline-flex items-center [&.active]:text-foreground text-muted-foreground hover:text-foreground transition-colors">
    All Jobs
  </Link>
  <Link to="/AddNewJob" className="inline-flex items-center [&.active]:text-foreground text-muted-foreground hover:text-foreground transition-colors">
    Add New Job
  </Link>
  {isAuthenticated && (
    <Link to="/profile" className="inline-flex items-center [&.active]:text-foreground text-muted-foreground hover:text-foreground transition-colors">
      <CgProfile className="w-8 h-auto"/>
    </Link>
  )}
</div>

      </div>
      <hr />
      <div className="bg-background text-foreground flex flex-col m-10 gap-y-10 max-w-2xl mx-auto">
        <Outlet />
      </div>
    </>
  );
}