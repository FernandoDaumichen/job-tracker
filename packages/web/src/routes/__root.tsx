import { Outlet, Link } from "@tanstack/react-router";

import { type QueryClient } from "@tanstack/react-query";

import { createRootRouteWithContext } from "@tanstack/react-router";

import { NotFound } from "@/components/not-found";
import { CgProfile } from "react-icons/cg";

import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
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
      <div className="p-6 w-full flex max-w-full mx-auto shadow-xl justify-between items-center bg-custom-header-200 dark:bg-custom-header-100">
        <Link to="/" className="text-2xl">
        <div className="flex items-center">
        <img src="/HIREFLOW2.png" alt="Logo" className="h-auto w-40 " />
        </div>
        </Link>
        <div className="flex gap-x-4 items-center">
          <Link
            to="/AllJobs"
            className="inline-flex items-center [&.active]:text-foreground dark:text-white text-muted-foreground hover:text-foreground transition-colors"
          >
            All Jobs
          </Link>
          <Link
            to="/AddNewJob"
            className="inline-flex items-center [&.active]:text-foreground dark:text-white text-muted-foreground hover:text-foreground transition-colors"
          >
            Add New Job
          </Link>
          {isAuthenticated && (
            <Link
              to="/profile"
              className="inline-flex items-center [&.active]:text-foreground dark:text-white text-muted-foreground hover:text-foreground transition-colors"
            >
              <CgProfile className=" dark:text-white w-8 h-auto" />
            </Link>
          )}
        </div>
      </div>
      <hr />
      <div className="bg-background text-foreground flex flex-col m-10 gap-y-10 max-w-full mx-auto pl-12 pr-12 pt-8">
        <Outlet />
      </div>
    </>
  );
}
