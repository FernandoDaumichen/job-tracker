
// import { Button } from "@/components/ui/button";
// import "./index.css";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/")({
  component: HomePage,
});

function HomePage() {
  return (
    <div className="h-screen w-full flex flex-col  ">
      <h1 className="text-3xl font-semibold text-center mb-4">
        Welcome to Job Application Tracker
      </h1>
    </div>
  );
}
