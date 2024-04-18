import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

export const Route = createFileRoute("/_authenticated/AllJobs")({
  component: AllJobs,
});

interface Jobs {
  id: number;
  title: string;
  company: string;
  requirements: string;
  date: string;
  imageUrl?: string;
}

function AllJobs() {
  const { getToken } = useKindeAuth();
  async function getAllJobs() {
    const token = await getToken();
    if (!token) {
      throw new Error("No token found");
    }
    const res = await fetch(import.meta.env.VITE_APP_API_URL + "/all-jobs", {
      headers: {
        Authorization: token,
      },
    });

    if (!res.ok) {
      throw new Error("Something went wrong while fetching the data");
    }
    return (await res.json()) as { jobs: Jobs[] };
  }

  const { isPending, error, data } = useQuery({
    queryKey: ["getAllJobs"],
    queryFn: getAllJobs,
  });

  return (
    <>
      <h1 className="text-2xl">Jobs Applied</h1>
      {error ? (
        "An error has occurred: " + error.message
      ) : (
        <Table>
          <TableCaption>Jobs List</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Requirements</TableHead>
              <TableHead>Job Image Desciption</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isPending ? (
              <TableRow>
                <TableCell className="font-medium">
                  <Skeleton className="h-4 w-full"></Skeleton>
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-full"></Skeleton>
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-full"></Skeleton>
                </TableCell>
                <TableCell className="text-right">
                  <Skeleton className="h-4 w-full"></Skeleton>
                </TableCell>
              </TableRow>
            ) : (
              data.jobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell className="font-medium">{job.title}</TableCell>
                  <TableCell>{job.company}</TableCell>
                  <TableCell>{job.requirements}</TableCell>
                  <TableCell>{job.imageUrl && (<img className="max-w-16"src={job.imageUrl}/>)}</TableCell>
                  <TableCell className="text-right">{job.date}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      )}
    </>
  );
}

export default AllJobs;
