"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { ICard } from "./types/tables";

export default function Flashcard({
    card,
}: {
    card: ICard
}) {
    const [isFront, setIsFront] = useState(true);

    return (
        <motion.div
            className="card p-4 h-50 flex justify-center items-center max-w-100 text-[clamp(1rem,5cqw,1.8rem)] leading-tight cursor-pointer hover:bg-card/50 m-auto w-full"
            onClick={() => setIsFront(!isFront)}
        >
            {isFront ? card.front : card.back}
        </motion.div>
    )
}