import { useTranslations } from "next-intl";
import SignInForm from "../forms/sign-in-form";
import DialogButton from "./dialog-button";

export default function SignInButton() {
    const t = useTranslations("SignInForm");
    return (
        <DialogButton title={t("title")} description={t("description")} content={<SignInForm />}>
            <p className="text-lg font-bold px-1">
                {t("trigger")}
            </p>
        </DialogButton>
    );
}