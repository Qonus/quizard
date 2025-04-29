import { z } from "zod";

export const SetSchema = z.object({
    title: z.string().min(1, "title.min").max(256, "title.max"),
    description: z.string().max(256, "description.max"),
});