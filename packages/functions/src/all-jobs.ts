import { Hono } from "hono";
import { handle } from "hono/aws-lambda";
import { jobs  as jobsTable } from "@job-tracker/core/db/schema/jobs";  
import { db } from "@job-tracker/core/db";
import { authMiddleware } from "@job-tracker/core/auth";
import { create } from "domain";
import { eq,desc } from "drizzle-orm";
const app = new Hono();



app.get("/all-jobs",authMiddleware, async(c) => {
  const userId = c.var.userId;
const jobs = await db 
.select()
.from(jobsTable)
.where(eq(jobsTable.userId,userId))
.orderBy(desc(jobsTable.createdAt))
console.log(jobs|| "no jobs found")
return c.json({ jobs });
});


app.post("/all-jobs",authMiddleware, async(c) => {
  const userId = c.var.userId;
    const body = await c.req.json();
  const job = {
    ...body.job,
    userId  
  }
  const newJob = await db.insert(jobsTable).values(job).returning()
    return c.json({ jobs: newJob });
  });
  
  app.delete("/all-jobs",authMiddleware, async(c) => {
    const userId = c.var.userId;
    const body = await c.req.json();
    const job = {
      ...body.job,
      userId  
    }
    const newJob = await db.delete(jobsTable).where(eq(jobsTable.id,job.id)).returning()
      return c.json({ jobs: newJob });
    });

    
export const handler = handle(app);
