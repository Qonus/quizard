import db from "../../../../db";
import { cards } from "../../../../db/schema";



export async function POST(request: Request) {
    try {
        const body = await request.json();

        const newSet = (await db.insert(cards).values(body).returning())[0];

        return new Response(JSON.stringify(newSet), {
            status: 201,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (e) {
        console.log(e);
        return new Response(JSON.stringify(e), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}