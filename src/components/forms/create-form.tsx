import { useForm } from "react-hook-form";
// import z from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

// const formSchema = z.object({
//     // title:
// })

export default function CreateForm() {
    const {
        register,
        handleSubmit,

    } = useForm();

    const OnSubmit = () => {

    }

    return (
        <form onSubmit={handleSubmit(OnSubmit)} className="">
            <Input {...register("title")} />
            <Button type="submit">Create</Button>
        </form>
    );
}