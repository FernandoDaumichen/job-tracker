import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
// import { useState } from "react";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { createFileRoute } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Calendar } from "@/components/ui/calendar";

export const Route = createFileRoute("/AddNewJob")({
  component: JobAddPage,
});

type Jobs = {
  title: string;
  company: string;
  requirements: string;
  date: string;
};

function JobAddPage() {
  const navigate = useNavigate({ from: "/AddNewJob" });

  const mutation = useMutation({
    mutationFn: async ({ data }: { data: Jobs }) => {
      const res = await fetch(import.meta.env.VITE_APP_API_URL + "/all-jobs", {
        method: "POST",
        body: JSON.stringify({ job: data }),
      });
      if (!res.ok) {
        throw new Error("Something went wrong while adding the job");
      }
      const json = await res.json();
      return json;
    },
  });

  const form = useForm({
    defaultValues: {
      title: "",
      company: "",
      requirements: "",
      image: undefined as undefined | File,
      date: new Date(),
    },
    onSubmit: async ({ value }) => {
      const data = {
        title: value.title,
        company: value.company,
        requirements: value.requirements,
        date: value.date.toISOString().split("T")[0],
      };
      await mutation.mutateAsync({ data });
      console.log("Job added successfully");
      navigate({ to: "/AllJobs" });
    },
    validatorAdapter: zodValidator,
  });

  return (
    <>
      <h2 className="text-2xl font-semibold text-center mt-6 mb-4">Add Job</h2>
      {mutation.isError && (
        <Alert>
          <AlertTitle>An error occurred while adding the job</AlertTitle>
          <AlertDescription>{mutation.error.message}</AlertDescription>
        </Alert>
      )}
      <form.Provider>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            void form.handleSubmit();
          }}
          className="flex flex-col space-y-3"
        >
          <div>
            <form.Field
              name="title"
              children={(field) => (
                <Label>
                  Title
                  <Input
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.errors && (
                    <em role="alert">{field.state.meta.errors.join(", ")}</em>
                  )}
                </Label>
              )}
            />
          </div>
          <div>
            <form.Field
              name="company"
              children={(field) => (
                <Label>
                  Company
                  <Input
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.errors && (
                    <em role="alert">{field.state.meta.errors.join(", ")}</em>
                  )}
                </Label>
              )}
            />
          </div>
          <div>
            <form.Field
              name="requirements"
              children={(field) => (
                <Label>
                  Requirements
                  <Input
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.errors && (
                    <em role="alert">{field.state.meta.errors.join(", ")}</em>
                  )}
                </Label>
              )}
            />
          </div>
          <div>
            <form.Field
              name="date"
              children={(field) => (
                <Calendar
                  mode="single"
                  selected={field.state.value}
                  onSelect={(date) => field.handleChange(date || new Date())}
                  className="rounded-md border"
                />
              )}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Add Job
          </button>
        </form>
      </form.Provider>
    </>
  );
}
