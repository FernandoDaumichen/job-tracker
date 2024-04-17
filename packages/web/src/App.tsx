import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
import "./index.css";

interface Jobs {
  id: number;
  title: string;
  company: string;
  requirements: string;
  date: string;
}

function App() {
  const [jobs, setJobs] = useState<Jobs[]>([]);
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [requirements, setRequirements] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    async function fetchJobs() {
      const res= await fetch(import.meta.env.VITE_APP_API_URL + "/all-jobs");
      const data = await res.json();
      setJobs(data.jobs);
    }
    fetchJobs();
  }, []);

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
    setJobs(data.jobs);
    setTitle("");
    setCompany("");
    setRequirements("");

  }

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-100 text-gray-800">
      <div className="w-full max-w-4xl p-5 bg-white rounded-lg shadow-xl">
        <h1 className="text-3xl font-semibold text-center mb-4">Jobs</h1>
        <div className="overflow-x-auto">
          <table className="w-full table-auto rounded-sm">
            <thead className="bg-gray-200 text-gray-600">
              <tr>
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Company</th>
                <th className="p-3 text-left">Requirements</th>
                <th className="p-3 text-left">Date</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {jobs.map((job) => (
                <tr key={job.id} className="border-b border-gray-300">
                  <td className="p-3">{job.title}</td>
                  <td className="p-3">{job.company}</td>
                  <td className="p-3">{job.requirements}</td>
                  <td className="p-3">{job.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  
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
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">Add Job</button>
        </form>
      </div>
    </div>
  );
  
}

export default App;
