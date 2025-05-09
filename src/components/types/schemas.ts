import { z } from "zod";

export const CardSchema = z.object({
    front: z.string().min(1, "cards.front.min").max(1024, "cards.front.max"),
    back: z.string().min(1, "cards.back.min").max(1024, "cards.back.max")
})

export const SetSchema = z.object({
    title: z.string().min(1, "title.min").max(256, "title.max"),
    description: z.string().max(1024, "description.max"),
    cards: z.array(CardSchema).min(1, "cards.min"),
    isPublic: z.boolean()
});