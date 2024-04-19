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
              <TableHead className="text-left">Title</TableHead>
              <TableHead className="text-left">Company</TableHead>
              <TableHead className="text-left">Requirements</TableHead>
              <TableHead className="text-center">
                Job Image Desciption
              </TableHead>
              <TableHead className="text-center">Date</TableHead>
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
                <TableCell className="text-center">
                  <Skeleton className="h-4 w-full"></Skeleton>
                </TableCell>
              </TableRow>
            ) : (
              data.jobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell className="font-medium">{job.title}</TableCell>
                  <TableCell>{job.company}</TableCell>
                  <TableCell>{job.requirements}</TableCell>
                  <TableCell className="justify-center align-center flex">
                    {job.imageUrl && (
                      <a
                        href={job.imageUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          className="w-28 h-28"
                          src={job.imageUrl}
                          alt={`Job at ${job.company}`}
                        />
                      </a>
                    )}
                  </TableCell>{" "}
                  <TableCell className="text-center">{job.date}</TableCell>
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
