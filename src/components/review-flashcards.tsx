"use client";

import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { ICard } from "./types/tables";

export default function ReviewFlashcards({
    cards
}: {
    cards: ICard[]
}) {
    const [current, setCurrent] = useState(0);
    const [isFront, setIsFront] = useState(true);

    const next = () => {
        setIsFront(true);
        if (current + 1 < cards.length) {
            setCurrent(current + 1);
        }
    };

    const prev = () => {
        setIsFront(true);
        if (current > 0) setCurrent(current - 1);
    };

    return (
        <div className="flex flex-col gap-5 perspective-midrange">
            <h1 className="title text-xl m-auto">{current + 1}/{cards.length}</h1>
            <motion.div
                className={`relative overflow-hidden rounded-3xl glow h-70 max-w-140 text-[clamp(1.5rem,5cqw,2rem)] leading-tight cursor-pointer m-auto w-full`}
                animate={{ rotateX: isFront ? 180 : 0 }}
                onClick={() => {
                    setIsFront(!isFront);
                }}
            >
                <div className={`size-full p-6 flex absolute bg-card rotate-x-180 ${isFront ? "z-2" : "z-1"}`}>
                    <p className="m-auto">
                        {cards[current].front}
                    </p>
                </div>
                <div className={`size-full p-7 flex absolute bg-card ${isFront ? "z-1" : "z-2"}`}>
                    <p className="m-auto">
                        {cards[current].back}
                    </p>
                </div>
            </motion.div>
            <div className="sticky max-w-200 m-auto bottom-0 w-full text-2xl flex justify-between p-5">
                <button onClick={prev}
                    className={cn("outline", current === 0 ? "dark:brightness-40" : "")}>
                    <ArrowLeft className="size-7" />
                </button>
                <button onClick={next}
                    className={cn("outline", current === cards.length - 1 ? "bg-muted dark:brightness-40" : "")}>
                    <ArrowRight className="size-7" />
                </button>
            </div>
        </div>
    )
}