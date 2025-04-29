import db from "../../../../db";
import { sets } from "../../../../db/schema";

// export async function GET(
//     request: Request
// ) {

// }

export async function POST(request: Request) {
    const body = await request.json();

    try {
        const newSet = (await db.insert(sets).values(body).returning())[0];

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