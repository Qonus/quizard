import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import db from "../../../../../db";
import { cards, sets, users } from "../../../../../db/schema";

export async function GET(
    request: Request,   // eslint-disable-line @typescript-eslint/no-unused-vars
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        const { id } = await params;
        const [set] = await db
            .select({
                id: sets.id,
                title: sets.title,
                description: sets.description,
                isPublic: sets.isPublic,
                user: {
                    id: users.id,
                    name: users.name,
                    email: users.email,
                    username: users.username,
                    image: users.image
                }
            })
            .from(sets)
            .leftJoin(users, eq(sets.userId, users.id))
            .where(eq(sets.id, id));

        if (!set) return new Response(JSON.stringify({ error: "Not Found" }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' }
        });

        const cardsInSet = await db.select().from(cards).where(eq(cards.setId, id));
        return new Response(JSON.stringify({
            ...set,
            cards: cardsInSet
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


export async function DELETE(
    request: Request,   // eslint-disable-line @typescript-eslint/no-unused-vars
    { params }: { params: Promise<{ id: string }> },
) {
    const { id } = await params;
    try {
        const [set] = await db.delete(sets).where(eq(sets.id, id)).returning();

        return new Response(JSON.stringify(set), {
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

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const body = await request.json();
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
        }

        const [updatedSet] = await db
            .update(sets)
            .set({
                title: body.title,
                description: body.description,
                isPublic: body.isPublic,
            })
            .where(eq(sets.id, id))
            .returning();

        await db.delete(cards).where(eq(cards.setId, id));

        const newCards = await db.insert(cards).values(
            body.cards.map((card: { front: string; back: string }) => ({
                front: card.front,
                back: card.back,
                setId: id,
            }))
        ).returning();

        return new Response(JSON.stringify({
            ...updatedSet,
            cards: newCards,
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (e) {
        console.log(e);
        return new Response(JSON.stringify({
            error: "Internal server error",
            details: e instanceof Error ? e.message : String(e),
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}