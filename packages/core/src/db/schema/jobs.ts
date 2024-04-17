import {
    pgTable,
    text,
    varchar,
    timestamp,
    index,
    numeric,
    serial,
    date,
  } from "drizzle-orm/pg-core";
  
  export const jobs = pgTable(
    "jobs",
    {
      id: serial("id").primaryKey(),
      userId: text("user_id").notNull(),
      title: varchar("title", { length: 100 }).notNull(),
      company: varchar("company", { length: 100 }).notNull(),
      requirements: text("requirements"),
      date: date("date", { mode: "string" }).notNull(),
      createdAt: timestamp("created_at", { withTimezone: true })
        .notNull()
        .defaultNow(),
    },
    (table) => {
      return {
        nameIdx: index("userId_idx").on(table.userId),
      };
    },
  );