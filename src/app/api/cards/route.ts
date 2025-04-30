import { eq } from "drizzle-orm";
import db from "../../../../db";
import { cards } from "../../../../db/schema";

export async function GET(
    request: Request,   // eslint-disable-line @typescript-eslint/no-unused-vars
) {
    const { searchParams } = new URL(request.url);
    try {
        const cardsInSet = await db.select().from(cards).where(eq(cards.setId, searchParams.get("setid") as string));

        return new Response(JSON.stringify(cardsInSet), {
            status: 201,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (e) {
        console.log(e);
        return new Response(JSON.stringify({
            error: "Internal server error",
            details: e instanceof Error ? e.message : String(e)
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}