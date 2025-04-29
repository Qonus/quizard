import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import TextareaAutosize from 'react-textarea-autosize';
import z from "zod";
import { SetSchema } from "../types/schemas";

type FormData = z.infer<typeof SetSchema>;

export default function EditSetForm() {
    const t = useTranslations("EditSetForm");
    const f = useForm<FormData>({ resolver: zodResolver(SetSchema) });
    const errors = f.formState.errors;
    const router = useRouter();

    const OnSubmit = async (data: FormData) => {
        try {
            const newSet = await axios.post(`/api/sets`, data);
            router.push(`/sets/${newSet.data.id}`);
        } catch {
            f.setError("description", {
                type: "server",
                message: "server",
            });
        }
    }

    return (
        <form onSubmit={f.handleSubmit(OnSubmit)} className="form">
            <input
                placeholder={t("title.placeholder")}
                {...f.register("title")}
                className="input"
                autoComplete="off"
            />
            {errors.title && (
                <p className="text-destructive">
                    {t(errors.title.message || "")}
                </p>
            )}
            <TextareaAutosize
                maxRows={10}
                placeholder={t("description.placeholder")}
                {...f.register("description")}
                className="input"
                autoComplete="off"
            />
            {errors.description && (
                <p className="text-destructive">
                    {t(errors.description.message || "")}
                </p>
            )}
            <motion.button
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="default">
                Create
            </motion.button>
        </form>
    );
}