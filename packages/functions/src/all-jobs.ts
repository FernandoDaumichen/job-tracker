import { Hono } from "hono";
import { handle } from "hono/aws-lambda";
import { jobs  as jobsTable } from "@job-tracker/core/db/schema/jobs";  
import { db } from "@job-tracker/core/db";
const app = new Hono();


app.get("/all-jobs", async(c) => {
const jobs = await db 
.select()
.from(jobsTable)
console.log(jobs|| "no jobs found")
return c.json({ jobs });
});


app.post("/all-jobs", async(c) => {
    const body = await c.req.json();
  const job = {
    ...body.job,
    userId:'qualquer'
  }
  const newJob = await db.insert(jobsTable).values(job).returning()
    return c.json({ jobs: newJob });
  });
  
export const handler = handle(app);
