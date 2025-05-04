"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Sparkle } from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { UseFieldArrayReturn, useForm, UseFormReturn } from "react-hook-form";
import TextareaAutosize from 'react-textarea-autosize';
import { z } from "zod";
import { SetSchema } from "../types/schemas";

const formSchema = z.object({
    prompt: z.string().min(1, "prompt.min")
})

type FormData = z.infer<typeof formSchema>;
type SetFormData = z.infer<typeof SetSchema>;

export default function GenerateSetForm({ form, cards }: {
    form: UseFormReturn<SetFormData>, cards: UseFieldArrayReturn<{
        cards: {
            front: string;
            back: string;
        }[];
        title: string;
        description: string;
        isPublic: boolean;
    }, "cards", "id">
}) {
    const [isLoading, setIsLoading] = useState(false);

    const f = useForm<FormData>({
        resolver: zodResolver(formSchema)
    })
    const errors = f.formState.errors;

    const generateSet = async (data: FormData) => {
        setIsLoading(true);
        try {
            const response = await axios.post("/api/generate/set", {
                set: {
                    title: form.getValues().title,
                    description: form.getValues().description,
                    cards: form.getValues().cards.map((card) => ({
                        front: card.front,
                        back: card.back
                    }))
                },
                prompt: data.prompt
            });
            const generatedSet = response.data;
            form.setValue("title", generatedSet.title);
            form.setValue("description", generatedSet.description);
            cards.replace(generatedSet.cards);
        } catch (e) {
            console.log("Error while generating new set:", e);
            f.setError("prompt", {
                type: "server",
                message: "server"
            })
        } finally {
            setIsLoading(false);
        }
    }

    const t = useTranslations("GenerateSetForm");
    return (
        <form
            onSubmit={f.handleSubmit(generateSet)}
            className="form p-4 max-w-180 m-auto pb-0"
        >
            <h1 className="title">
                {t("title")}
            </h1>
            <div className="flex flex-col gap-3">
                <TextareaAutosize
                    maxRows={10}
                    placeholder={t("prompt.placeholder")}
                    {...f.register("prompt")}
                    className="input"
                    autoComplete="off"
                />
                <div className="flex justify-end sm:flex-row flex-col gap-5">
                    {errors.prompt &&
                        <p className="error w-full">
                            {t(errors.prompt.message || "")}
                        </p>
                    }
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="default p-2 text-lg flex gap-2 items-center w-fit">
                        <Sparkle />
                        {t("submit")}
                    </motion.button>
                </div>
                {isLoading && <p className="text-xl">{t("loading")}</p>}
            </div>
        </form>
    );
}