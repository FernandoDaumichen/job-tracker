import React from "react";
import ReactDOM from "react-dom/client";
// import App from './routes/index.tsx'
import "./index.css";
import { KindeProvider } from "@kinde-oss/kinde-auth-react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

const queryClient = new QueryClient();

const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

ReactDOM.createRoot(document.getElementById("root")! ).render(
  <React.StrictMode>
    <KindeProvider
      audience={import.meta.env.VITE_APP_KINDE_AUDIENCE}
      clientId="985005b95e0d460f9c71773ee70de035"
      domain="https://jobtracker.kinde.com"
      logoutUri={window.location.origin}
      redirectUri={window.location.origin}
  >
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </KindeProvider>
  </React.StrictMode>
);
