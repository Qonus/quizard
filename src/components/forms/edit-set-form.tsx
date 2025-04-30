"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Trash } from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";
import TextareaAutosize from 'react-textarea-autosize';
import z from "zod";
import BackButton from "../buttons/back-button";
import { SetSchema } from "../types/schemas";

type FormData = z.infer<typeof SetSchema>;

export default function EditSetForm({
    defaultValues = {
        id: undefined,
        title: "",
        description: "",
        isPublic: false,
        cards: Array(5).fill({ front: "", back: "" }),
    } }) {
    const t = useTranslations("EditSetForm");
    const router = useRouter();

    const f = useForm<FormData>({
        resolver: zodResolver(SetSchema),
        defaultValues: defaultValues,
    });
    const errors = f.formState.errors;

    const card = useFieldArray({
        control: f.control,
        name: "cards"
    });

    const OnSubmit = async (data: FormData) => {
        try {
            let newSet;
            if (defaultValues.id) {
                newSet = await axios.put(`/api/sets/${defaultValues.id}`, data);
            } else {
                newSet = await axios.post(`/api/sets`, data);
            }
            router.push(`/sets/${newSet.data.id}`);
        } catch {
            f.setError("description", {
                type: "server",
                message: "server",
            });
        }
    }

    return (
        <form onSubmit={f.handleSubmit(OnSubmit)} className="form p-4 max-w-200 m-auto pb-0">
            <div className="flex sm:justify-between sm:flex-row flex-col gap-5">
                <h1 className="title">{t("header." + (defaultValues.id ? "edit" : "create"))}</h1>
                <button
                    type="button"
                    onClick={() => f.setValue("isPublic", !f.watch("isPublic"))}
                    className="outline w-fit px-5">
                    {t(f.watch("isPublic") ? "public" : "private")}
                </button>

            </div>
            <div className="field">
                <input
                    placeholder={t("title.placeholder")}
                    {...f.register("title")}
                    className="input"
                    autoComplete="off"
                />
                {errors.title && (
                    <p className="error">
                        {t(errors.title.message || "")}
                    </p>
                )}
            </div>
            <div className="field">
                <TextareaAutosize
                    maxRows={10}
                    placeholder={t("description.placeholder")}
                    {...f.register("description")}
                    className="input"
                    autoComplete="off"
                />
                {errors.description && (
                    <p className="eror">
                        {t(errors.description.message || "")}
                    </p>
                )}
            </div>

            <div className="flex flex-col gap-5">
                <h1 className="title">{t("cards.header")}</h1>
                {card.fields.map((field, index) => (
                    <div key={index} className="card p-7 flex flex-col gap-5">
                        <div className="flex justify-between">
                            <p className="text-lg">{t("cards.number")} {index + 1}</p>
                            {card.fields.length > 2 && (
                                <button
                                    type="button"
                                    className="ghost"
                                    onClick={() => card.remove(index)}
                                >
                                    <Trash className="size-5 stroke-destructive" />
                                </button>
                            )}
                        </div>

                        <div className="field">
                            <label>{t("cards.front.label")}</label>
                            <TextareaAutosize
                                maxRows={10}
                                placeholder={t("cards.front.placeholder")}
                                {...f.register(`cards.${index}.front`)}
                                className="input bg-background/50 focus:bg-card"
                                autoComplete="off"
                            />
                            {errors.cards?.[index]?.front && (
                                <p className="error">{t(errors.cards[index]?.front?.message || "")}</p>
                            )}
                        </div>

                        <div className="field">
                            <label>{t("cards.back.label")}</label>
                            <TextareaAutosize
                                maxRows={10}
                                placeholder={t("cards.back.placeholder")}
                                {...f.register(`cards.${index}.back`)}
                                className="input bg-background/50 focus:bg-card"
                                autoComplete="off"
                            />
                            {errors.cards?.[index]?.back && (
                                <p className="error">{t(errors.cards[index]?.back?.message || "")}</p>
                            )}
                        </div>
                    </div>
                ))}
                <motion.button
                    className="card text-xl font-bold px-0 m-auto"
                    type="button"
                    initial={{ width: "75%" }}
                    whileTap={{ width: "100%", height: "200px", fontSize: "40px" }}
                    transition={{}}
                    onClick={() => card.append({ front: "", back: "" })}>
                    {t("cards.add")}
                </motion.button>
            </div>
            <div className="sticky bottom-0 bg-linear-to-t from-background via-background via-30% to-transparent p-4 flex justify-between items-center">
                <BackButton />
                <motion.button
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="default py-4 px-15 text-lg font-bold">
                    {t(defaultValues.title ? "edit" : "create")}
                </motion.button>
            </div>
        </form>
    );
}