import { getSetByID } from "@/app/sets/actions";
import QuizPage from "@/components/pages/quiz-page";
import { ICard } from "@/components/types/tables";
import { notFound } from "next/navigation";

function getShuffledOptions(cards: ICard[], correctBack: string) {
    const otherBacks = cards
        .filter(c => c.back !== correctBack)
        .map(c => c.back);
    const shuffled = [...otherBacks].sort(() => 0.5 - Math.random()).slice(0, 3);
    const options = [...shuffled, correctBack].sort(() => 0.5 - Math.random());
    return options;
};

export default async function LearnPage({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;
    const set = await getSetByID(id);
    if (!set || set.cards.length < 4) notFound();

    const quiz = set.cards.sort(() => 0.5 - Math.random()).map((card: ICard) => ({
        front: card.front,
        correct: card.back,
        options: getShuffledOptions(set.cards, card.back)
    }));

    return (
        <QuizPage quiz={quiz} />
    )
}