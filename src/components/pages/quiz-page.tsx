"use client";

import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface IQuestion {
    front: string,
    correct: string,
    options: string[]
}

export default function QuizPage({ quiz }: { quiz: IQuestion[] }) {
    const [current, setCurrent] = useState(0);
    const [isSubmiting, setIsSubmiting] = useState(false);
    const [answers, setAnswers] = useState<(string | null)[]>(Array(quiz.length));
    const [showResults, setShowResults] = useState(false);

    const t = useTranslations("LearnPage");
    const router = useRouter();

    const next = () => {
        if (current + 1 >= quiz.length) {
            setShowResults(true);
        } else {
            setCurrent(current + 1);
        }
    };

    const prev = () => {
        if (current > 0) setCurrent(current - 1);
    };

    if (showResults) {
        const correctCount = answers.reduce((acc, answer, i) => {
            return acc + (answer === quiz[i].correct ? 1 : 0);
        }, 0);

        return (
            <div className="max-w-xl mx-auto mb-30">
                <div className="flex justify-between mb-10 sticky top-0 p-4 pt-10 bg-background">
                    <h1 className="text-2xl font-bold">{t("results")}</h1>
                    <p className="text-2xl font-bold">{correctCount}/{quiz.length}</p>
                </div>

                <div className="space-y-4">
                    {quiz.map((question, i) => (
                        <div key={i} className={cn("p-4 border-2 rounded-xl bg-card", question.correct == answers[i] ? "border-green-400/30" : "border-primary/30")}>
                            <h1 className={cn("text-xl mb-5", question.correct == answers[i] ? "text-green-400" : "text-primary")}>{t(question.correct == answers[i] ? "correct" : "wrong")}</h1>
                            <p className="text-xl font-bold">{question.front}</p>
                            <p className="text-lg">{t("answer")}: {answers[i] ?? "No answer"}</p>
                            {answers[i] !== question.correct && (
                                <p className="text-lg">{t("correct")}: {question.correct}</p>
                            )}
                        </div>
                    ))}
                </div>

                <div className="sticky bottom-0 bg-linear-to-t from-background via-background via-30% to-transparent p-4 flex justify-end items-center">
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        className="default py-4 px-15 text-lg font-bold"
                        onClick={() => router.back()}
                    >
                        {t("done")}
                    </motion.button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full">
            <div className="sticky max-w-200 m-auto top-0 w-full h-10 text-2xl flex">
                <h1 className="m-auto font-bold">{t("question")} {current + 1}</h1>
            </div>
            {/* {answers.map((ans, i) => <p key={i}>{i} {ans}</p>)} */}
            <div className="flex flex-col gap-10 p-5">
                <div className="card max-w-180 w-full m-auto">
                    <h1 className="font-bold text-2xl">{quiz[current].front}</h1>
                </div>
                <div className="flex flex-col max-w-200 w-full m-auto">
                    {quiz[current].options.map((option, index) => (
                        <button key={index}
                            className={cn(
                                "p-6 px-10 hover:bg-card transition cursor-pointer border-1 border-card w-full flex",
                                (isSubmiting || answers[current]) && (option == quiz[current].correct ? "border-green-500" : (answers[current] == option ? "border-primary" : "")))}
                            onClick={() => {
                                if (isSubmiting) return;
                                setIsSubmiting(true);
                                const newAnswers = [...answers];
                                newAnswers[current] = option;
                                setAnswers(newAnswers);
                                setTimeout(() => {
                                    next();
                                    setIsSubmiting(false);

                                }, 1000);
                            }}
                        >
                            <p className="text-lg font-bold">{option}</p>
                        </button>
                    ))}
                </div>
            </div>
            <div className="sticky max-w-200 m-auto bottom-0 w-full h-10 text-2xl flex justify-between">
                <button onClick={prev}
                    className={cn("outline", current === 0 ? "brightness-40" : "")}>
                    <ArrowLeft className="size-7" />
                </button>
                <button onClick={next}
                    className={cn("outline", current === quiz.length - 1 ? "brightness-40" : "")}>
                    <ArrowRight className="size-7" />
                </button>
            </div>
        </div >
    )
}