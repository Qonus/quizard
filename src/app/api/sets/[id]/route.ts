import { eq } from "drizzle-orm";
import db from "../../../../../db";
import { sets } from "../../../../../db/schema";

export async function GET(
    request: Request,   // eslint-disable-line @typescript-eslint/no-unused-vars
    { params }: { params: Promise<{ id: string }> },
) {
    const { id } = await params;
    try {
        const set = await db.select().from(sets).where(eq(sets.id, id));
        return new Response(JSON.stringify(set[0]), {
            headers: { "Content-Type": "application/json" }
        })
    } catch (e) {
        console.log(e);
        return new Response();
    }
}