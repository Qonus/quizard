import { auth } from "@/lib/auth";
import { and, eq } from "drizzle-orm";
import db from "../../../../db";
import { cards, sets, users } from "../../../../db/schema";

export async function GET(
    request: Request,   // eslint-disable-line @typescript-eslint/no-unused-vars
) {
    try {
        const { searchParams } = new URL(request.url);
        const userid = searchParams.get("userid");
        const res = await db
            .select({
                id: sets.id,
                title: sets.title,
                description: sets.description,
                isPublic: sets.isPublic,
                user: {
                    id: users.id,
                    name: users.name,
                    email: users.email,
                    username: users.username
                }
            })
            .from(sets)
            .leftJoin(users, eq(sets.userId, users.id))
            .where(and(
                userid ? eq(sets.userId, userid) : eq(sets.isPublic, true)
            ));

        return new Response(JSON.stringify(res), {
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


export async function POST(request: Request) {
    const body = await request.json();

    try {
        const session = await auth();
        let [newSet] = await db.insert(sets).values({
            title: body.title,
            description: body.description,
            isPublic: body.isPublic,
            userId: session?.user?.id as string,
        }).returning();

        const newCards = await db.insert(cards).values(
            body.cards.map((card: { front: string; back: string }) => ({
                front: card.front,
                back: card.back,
                setId: newSet.id,
            }))
        ).returning();

        return new Response(JSON.stringify({
            ...newSet,
            cards: newCards
        }), {
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