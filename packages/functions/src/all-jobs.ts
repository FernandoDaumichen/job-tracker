import { Hono } from "hono";
import { handle } from "hono/aws-lambda";

const app = new Hono();
const fakeJobs = [
    {
        id: 1,
        title: "Full Stack ",
        company: "IDK1",
        requirements: " Some requirements here",
        date : "2021-09-01"
    },
    {
        id: 2,
        title: "Frontend Engineer",
        company: "IDK2",
        requirements: "Some requirements here2",
        date : "2021-09-02"
    },
    {
        id: 3,
        title: "Backend Engineer",
        company: "IDK3",
        requirements: "Some requirements here3",
        date : "2021-09-03"
    },
    ];

app.get("/all-jobs", (c) => {
  return c.json({ jobs: fakeJobs });
});

app.post("/all-jobs", async(c) => {
    const body = await c.req.json();
    const job=body.job;
    fakeJobs.push({ ...job,
        id: (fakeJobs.length + 1).toString(),
       
    });
    return c.json({ jobs: fakeJobs });
  });
  
export const handler = handle(app);
