"use client";

import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import Flashcard from "./flashcard";
import { ICard } from "./types/tables";

export default function ReviewFlashcards({
    cards
}: {
    cards: ICard[]
}) {
    const [current, setCurrent] = useState(0);

    const next = () => {
        if (current + 1 < cards.length) {
            setCurrent(current + 1);
        }
    };

    const prev = () => {
        if (current > 0) setCurrent(current - 1);
    };

    const t = useTranslations("CardReview");

    return (
        <div className="flex flex-col gap-5">
            <h1 className="title text-xl m-auto">{current + 1}/{cards.length}</h1>
            <Flashcard card={cards[current]} />
            <div className="sticky max-w-200 m-auto bottom-0 w-full text-2xl flex justify-between p-5">
                <button onClick={prev}
                    className={cn("outline", current === 0 ? "brightness-40" : "")}>
                    <ArrowLeft className="size-7" />
                </button>
                <button onClick={next}
                    className={cn("outline", current === cards.length - 1 ? "brightness-40" : "")}>
                    <ArrowRight className="size-7" />
                </button>
            </div>
        </div>
    )
}