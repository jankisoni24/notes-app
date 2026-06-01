import "dotenv/config";

import { drizzle } from "drizzle-orm/node-postgres";

import pg from "pg";

const { Pool } = pg;

// const pool = new Pool({
//   connectionString:
//     process.env.DATABASE_URL,
// });
const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'notes_app_db',
  user: 'postgres',
  password: 'admin123',
});

pool.connect()
  .then(() => {
    console.log(
      "PostgreSQL Connected"
    );
  })
  .catch((err) => {
    console.log(
      "DB CONNECTION ERROR"
    );

    console.log(err);
  });

export const db = drizzle(pool);