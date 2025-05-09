import { cn } from "@/lib/utils";

export default function Quizard({ className }: { className?: string }) {
    return (
        <svg
            width="800px"
            height="800px"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn("size-10 fill-primary", className)}
        >
            <path
                d="M24 40C35.0457 40 44 38.2091 44 36C44 34.5611 40.7012 33.2997 35 32.5949L27 12L15 8L18 14L13 32.5949C7.2988 33.2997 4 34.5611 4 36C4 38.2091 12.9543 40 24 40Z" />
        </svg>
    );
}