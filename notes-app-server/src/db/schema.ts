import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const notesTable = pgTable(
  "notes",
  {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    content: text("content").notNull(),
    colorIndex: integer(
      "color_index"
    ).notNull(),
    createdAt: timestamp(
      "created_at"
    ).defaultNow(),
  }
);