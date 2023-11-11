import OpenAI from "openai/index";

const apiKey = process.env.OPENAI_KEY;

const openai = new OpenAI({
    apiKey,
});

export const gptPrompt = async (value: string) => {
    const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: `Напиши только название фильма, который я описываю: ${value}` }],
        model: 'gpt-3.5-turbo',
    });
    return chatCompletion.choices[0].message.content
}