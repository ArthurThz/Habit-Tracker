import { neon } from "@neondatabase/serverless";

export const dbConnection = neon(process.env.DATABASE_URL!);
