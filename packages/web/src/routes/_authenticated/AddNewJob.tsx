import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { createFileRoute } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Calendar } from "@/components/ui/calendar";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { useState } from "react";
export const Route = createFileRoute("/_authenticated/AddNewJob")({
  component: JobAddPage,
});

type Jobs = {
  title: string;
  company: string;
  requirements: string;
  date: string;
  imageUrl?: string;
};

function JobAddPage() {
  const { getToken } = useKindeAuth();
  const navigate = useNavigate({ from: "/AddNewJob" });
  const [filePreviewURL, setFilePreviewURL] = useState<string | undefined>();

  const computeSHA256 = async (file: File) => {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return hashHex;
  };

  const mutation = useMutation({
    mutationFn: async ({ data, image }: { data: Jobs; image?: File }) => {
      const token = await getToken();
      if (!token) {
        throw new Error("No token found");
      }
      if (image) {
        const signedURLResponse = await fetch(
          import.meta.env.VITE_APP_API_URL + "/signed-url",
          {
            method: "POST",
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contentType: image.type,
              contentLength: image.size,
              checksum: await computeSHA256(image),
            }),
          }
        );
        if (!signedURLResponse.ok) {
          throw new Error("An error occurred while creating the expense");
        }
        const { url } = (await signedURLResponse.json()) as { url: string };
        // console.log(url);
        await fetch(url, {
          method: "PUT",
          body: image,
          headers: {
            "Content-Type": image.type,
          },
        });

        const imageUrl = url.split("?")[0];
        // console.log(imageUrl);
        data.imageUrl = imageUrl;
      }
      const res = await fetch(import.meta.env.VITE_APP_API_URL + "/all-jobs", {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
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
      await mutation.mutateAsync({ data, image: value.image });
      console.log("Job added successfully");
      navigate({ to: "/AllJobs" });
    },
    validatorAdapter: zodValidator,
  });

  return (
    <>
      <div className="flex flex-col bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-center mt-6 mb-4  text-green-900 ">
          Add Job
        </h2>
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
                      style={{
                        backgroundColor: "white",
                        color: "black",
                        borderColor: "gray",
                      }}
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
                      style={{
                        backgroundColor: "white",
                        color: "black",
                        borderColor: "gray",
                      }}
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
                    <textarea
                      className="mt-1 block w-full h-48 p-2 border border-black rounded-md shadow-sm focus:border-black focus:ring focus:ring-black focus:ring-opacity-50"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {field.state.meta.errors && (
                      <em role="alert" className="text-red-500">
                        {field.state.meta.errors.join(", ")}
                      </em>
                    )}
                  </Label>
                )}
              />
            </div>

            <div className="flex flex-col justify-center ">
              <div className="flex justify-center pb-4">
                <form.Field
                  name="image"
                  children={(field) => (
                    <Label>
                      Job description image
                      <Input
                        type="file"
                        accept="image/* "
                        onBlur={field.handleBlur}
                        style={{
                          backgroundColor: "white",
                          color: "black",
                          borderColor: "gray",
                        }}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (filePreviewURL) {
                            URL.revokeObjectURL(filePreviewURL);
                          }
                          if (file) {
                            const url = URL.createObjectURL(file);
                            setFilePreviewURL(url);
                          } else {
                            setFilePreviewURL(undefined);
                          }
                          field.handleChange(file);
                        }}
                      />
                      {filePreviewURL && (
                        <img
                          src={filePreviewURL}
                          className=" max-w-40 m-auto"
                          alt="Job description image"
                        />
                      )}
                      {field.state.meta.errors && (
                        <em role="alert">
                          {field.state.meta.errors.join(", ")}
                        </em>
                      )}
                    </Label>
                  )}
                />
              </div>

              <div className="flex justify-center text-center">
                <div className="p-2">
                  <Label>
                    Date of the Application
                    <form.Field
                      name="date"
                      children={(field) => (
                        <Calendar
                          mode="single"
                          selected={field.state.value}
                          onSelect={(date) =>
                            field.handleChange(date || new Date())
                          }
                          className="rounded-md border"
                        />
                      )}
                    />
                  </Label>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="bg-custom-body-dark-300 text-white py-2 px-4 rounded-lg  hover:bg-green-900"
            >
              Add Job
            </button>
          </form>
        </form.Provider>
      </div>
    </>
  );
}
