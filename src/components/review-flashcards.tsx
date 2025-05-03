"use client";

import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { ICard } from "./types/tables";

export default function ReviewFlashcards({
    cards
}: {
    cards: ICard[]
}) {
    const [current, setCurrent] = useState(0);
    const [isFront, setIsFront] = useState(true);
    const [direction, setDirection] = useState(0);

    const nav = (dir: number) => {
        setIsFront(true);
        setDirection(dir);
        if (current + dir + 1 > cards.length) setCurrent(0);
        else if (current + dir < 0) setCurrent(current + dir + cards.length);
        else setCurrent(current + dir);
    };

    const variants = {
        enter: {
            originZ: 300,
            rotateY: direction * -90,
            opacity: 0.2
        },
        center: {
            opacity: 1,
            originZ: 0,
            rotateY: 0,
            rotateX: isFront ? 0 : -180,
        },
        exit: (dir: number) => ({
            originZ: 300,
            rotateY: dir * 90,
            opacity: 0.2,
            transition: { duration: 0.1 }
        })
    };

    return (
        <div className="flex flex-col gap-5">
            <h1 className="title text-xl m-auto">{current + 1}/{cards.length}</h1>
            <div className="perspective-midrange">
                <AnimatePresence
                    mode="popLayout"
                    custom={direction}
                >
                    <motion.div
                        key={current}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.5, type: "spring" }}
                        className={`relative bg-card rounded-3xl glow h-70 max-w-140 text-[clamp(1.5rem,5cqw,2rem)] leadintg-tight cursor-pointer m-auto w-full transform-3d`}
                        onClick={() => {
                            setIsFront(!isFront);
                        }}
                    >
                        <div
                            className="size-full p-7 flex absolute backface-hidden rotate-y-0"
                        >
                            <p className="m-auto">
                                {cards[current].front}
                            </p>
                        </div>
                        <div
                            className="size-full p-7 flex absolute backface-hidden [transform:rotateX(180deg)]"
                        >
                            <p className="m-auto">
                                {cards[current].back}
                            </p>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
            <div className="sticky max-w-200 m-auto bottom-0 w-full text-2xl flex justify-between p-5">
                <button onClick={() => nav(-1)}
                    className={cn("outline", current === 0 ? "dark:brightness-40" : "")}>
                    <ArrowLeft className="size-7" />
                </button>
                <button onClick={() => nav(1)}
                    className={cn("outline", current === cards.length - 1 ? "bg-muted dark:brightness-40" : "")}>
                    <ArrowRight className="size-7" />
                </button>
            </div>
        </div>
    )
}