import { defineConfig } from "drizzle-kit";

export default defineConfig({
    out: "./db/migrations",
    schema: "./db/schema.ts",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.AUTH_DRIZZLE_URL as string,
    },
    strict: true
});