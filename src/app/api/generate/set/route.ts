import axios from "axios";

export async function POST(request: Request) {
    const body = await request.json();
    const systemMessage = `
    Modify user's flashcard set.

    Here is user's flashcard set: ${JSON.stringify(body.set)}
    
    Here are your rules:

    - Set should be modified based on this prompt or populated to theme described in it if the set is empty: {
        "${body.prompt}"
    }

    - Return json of modified flashcard set strictly in this, original format: {
        title: string,
        description: string,
        cards: {
            front: string,
            back: string,
        }[],
    }
    
    - Your set should obey these constraints: {
        - title: required and no longer than 256 characters
        - description: no longer than 1024 characters
        - cards: minimum 2 cards
        - front: required and no longer than 1024 characters
        - back: required and no longer than 1024 characters
    }

    - Your response should be JSON parsable
    `;
    try {
        const response = await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
            contents: [{
                parts: [{ text: systemMessage }]
            }],
            generationConfig: {
                response_mime_type: "application/json",
            }
        });
        console.log(response.data.candidates[0].content.parts[0].text);
        return new Response(JSON.stringify(JSON.parse(response.data.candidates[0].content.parts[0].text)), {
            status: 201,
            headers: { "Content-Type": "application/json" }
        });
    } catch (e) {
        console.log(e);
        return new Response(JSON.stringify({
            error: "Internal server error",
            details: e instanceof Error ? e.message : String(e)
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}