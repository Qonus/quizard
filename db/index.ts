import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from "./schema";

const sql = neon(process.env.AUTH_DRIZZLE_URL!);
const db = drizzle({ client: sql, schema: schema });

export default db;
