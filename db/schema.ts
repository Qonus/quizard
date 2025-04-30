import {
    boolean,
    integer,
    pgTable,
    primaryKey,
    text,
    timestamp,
    varchar
} from "drizzle-orm/pg-core"
import type { AdapterAccountType } from "next-auth/adapters"

export const sets = pgTable("set", {
    id: text()
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    title: varchar({ length: 128 }).notNull(),
    userId: text().notNull().references(() => users.id, { onDelete: "cascade" }),
    description: varchar({ length: 256 }),
    isPublic: boolean().default(false),
    createdAt: timestamp({ mode: "date" }).defaultNow()
})

export const cards = pgTable("card", {
    id: text().primaryKey().$defaultFn(() => crypto.randomUUID()),
    setId: text().notNull().references(() => sets.id, { onDelete: "cascade" }),
    front: varchar({ length: 128 }).notNull(),
    back: varchar({ length: 128 }).notNull(),
    image: text()
})

export const users = pgTable("user", {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    name: text("name"),
    username: text("username").unique(),
    email: text("email").unique(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    image: text("image"),
})

export const recents = pgTable("recent", {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
    setId: text("setId").notNull().references(() => sets.id, { onDelete: "cascade" }),
    lastOpened: timestamp("last_opened").defaultNow(),
})

export const accounts = pgTable(
    "account",
    {
        userId: text("userId")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        type: text("type").$type<AdapterAccountType>().notNull(),
        provider: text("provider").notNull(),
        providerAccountId: text("providerAccountId").notNull(),
        refresh_token: text("refresh_token"),
        access_token: text("access_token"),
        expires_at: integer("expires_at"),
        token_type: text("token_type"),
        scope: text("scope"),
        id_token: text("id_token"),
        session_state: text("session_state"),
    },
    (account) => [
        {
            compoundKey: primaryKey({
                columns: [account.provider, account.providerAccountId],
            }),
        },
    ]
)

export const sessions = pgTable("session", {
    sessionToken: text("sessionToken").primaryKey(),
    userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    expires: timestamp("expires", { mode: "date" }).notNull(),
})

export const verificationTokens = pgTable(
    "verificationToken",
    {
        identifier: text("identifier").notNull(),
        token: text("token").notNull(),
        expires: timestamp("expires", { mode: "date" }).notNull(),
    },
    (verificationToken) => [
        {
            compositePk: primaryKey({
                columns: [verificationToken.identifier, verificationToken.token],
            }),
        },
    ]
)

export const authenticators = pgTable(
    "authenticator",
    {
        credentialID: text("credentialID").notNull().unique(),
        userId: text("userId")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        providerAccountId: text("providerAccountId").notNull(),
        credentialPublicKey: text("credentialPublicKey").notNull(),
        counter: integer("counter").notNull(),
        credentialDeviceType: text("credentialDeviceType").notNull(),
        credentialBackedUp: boolean("credentialBackedUp").notNull(),
        transports: text("transports"),
    },
    (authenticator) => [
        {
            compositePK: primaryKey({
                columns: [authenticator.userId, authenticator.credentialID],
            }),
        },
    ]
)