import { InferSelectModel } from "drizzle-orm";
import { cards, users } from "../../../db/schema";

export interface ISet {
    id: string,
    title: string,
    description: string | undefined,
    isPublic: boolean,
    user: IUser,
    cards: ICard[]
}

export type IUser = InferSelectModel<typeof users>;

export type ICard = InferSelectModel<typeof cards>;