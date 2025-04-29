import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

const sql = neon(process.env.AUTH_DRIZZLE_URL!);
const db = drizzle({ client: sql });

export default db;
