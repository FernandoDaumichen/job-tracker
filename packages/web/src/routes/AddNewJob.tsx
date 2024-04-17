// import { useForm } from "@tanstack/react-form";
// import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

// interface Jobs {
//   id: number;
//   title: string;
//   company: string;
//   requirements: string;
//   date: string;
// }



export const Route = createFileRoute("/AddNewJob")({
  component: JobAdd,
});

function JobAdd() {
  // const [jobs, setJobs] = useState<Jobs[]>([]);
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [requirements, setRequirements] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate({ from: "/job-adding" });


  const handleSubmit = async (e: React.FormEvent) => {  
    e.preventDefault();
    const res = await fetch(
      import.meta.env.VITE_APP_API_URL + "/all-jobs", 
      {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
job: {
        title,
        company,
        requirements,
        date,
      },}),
    });
    const data = await res.json();
    console.log(data);
    setTitle("");
    setCompany("");
    setRequirements("");
    console.log("done");
      navigate({ to: "/AllJobs" });

  }

  return (
    <>
      <h2 className="text-2xl font-semibold text-center mt-6 mb-4">Add Job</h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 border rounded-lg"
        />
        <input
          type="text"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="p-2 border rounded-lg"
        />
        <input
          type="text"
          placeholder="Requirements"
          value={requirements}
          onChange={(e) => setRequirements(e.target.value)}
          className="p-2 border rounded-lg"
        />
        <input
          type="date"
          value={date}
          placeholder="Date"
          onChange={(e) => setDate(e.target.value)}
          className="p-2 border rounded-lg"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Add Job
        </button>
      </form>
    </>
  );
}
