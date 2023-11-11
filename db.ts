import { Pool } from "pg";
export const pool = new Pool({
  user: process.env.DATA_BASE_USER,
  password: process.env.DATA_BASE_PASSWORD,
  host: process.env.DATA_BASE_HOST,
  port: Number(process.env.DATA_BASE_PORT),
  database: process.env.DATA_BASE_NAME,
});
