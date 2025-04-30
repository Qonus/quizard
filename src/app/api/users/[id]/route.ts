import { eq } from "drizzle-orm";
import db from "../../../../../db";
import { users } from "../../../../../db/schema";

export async function GET(
    request: Request, // eslint-disable-line @typescript-eslint/no-unused-vars
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const [user] = await db.select().from(users).where(eq(users.id, id));
        return new Response(JSON.stringify(user), {
            status: 201,
            headers: { "Content-Type": "application/json" }
        })
    } catch (e) {
        console.log(e);
        return new Response(JSON.stringify({
            error: "Internal server error",
            details: e instanceof Error ? e.message : String(e)
        }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        })
    }
}