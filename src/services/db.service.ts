import { Pool } from "pg";

const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: +process.env.PG_PORT,
    idleTimeoutMillis: 2000,
    max: 50,
    min: 0,
});

export const query = async <T = any>(text: string, params?: any) => await pool.query<T>(text, params);
