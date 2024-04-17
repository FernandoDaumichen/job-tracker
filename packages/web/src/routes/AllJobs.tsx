import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/AllJobs')({
  component: AllJobs
})


interface Jobs {
    id: number;
    title: string;
    company: string;
    requirements: string;
    date: string;
  }
  
  function AllJobs() {
    const [jobs, setJobs] = useState<Jobs[]>([]);
  
  
    useEffect(() => {
      async function fetchJobs() {
        const res= await fetch(import.meta.env.VITE_APP_API_URL + "/all-jobs");
        const data = await res.json();
        setJobs(data.jobs);
      }
      fetchJobs();
    }, []);
  
    
  
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
        
        </div>
      </div>
    );
    
  }
  
  