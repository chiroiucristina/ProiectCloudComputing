import { NextResponse } from 'next/server';
import openai from "@/lib/openai";

const SYSTEM_PROMPTS = {
    SIMPLE_ASSISTANT: {
        MESSAGE: {
            'role': 'system',
            'content': 'You are a simple assistant. You respond with simple sentences.',
        },
        TEMPERATURE: 1,
        MAX_TOKENS: 50,
        TYPE: 'simple_assistant',
    },
    USER: {
        MESSAGE: {
            'role': 'system',
            'content': 'You are a user. You respond with normal sentences.',
        },
        TEMPERATURE: 1,
        MAX_TOKENS: 100,
        TYPE: 'user',
    },
};

const chatCompletion = async (messagesArray, max_tokens, temperature) => {
    const rawResponse = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: messagesArray,
        max_tokens: max_tokens,
        temperature: temperature,
    });
    return rawResponse?.choices[0];
}

export async function POST(request) {
    try {
        const body = await request.json();
        const { messages, type } = body;

        if (!messages || !type) {
            return NextResponse.json({ error: 'Missing input or type' }, { status: 400 });
        }

        // Alegem UseCase-ul
        const useCase = type === SYSTEM_PROMPTS.USER.TYPE 
            ? SYSTEM_PROMPTS.USER 
            : SYSTEM_PROMPTS.SIMPLE_ASSISTANT;

        const MAX_MEMORY = 3;
        const userMessagesArray = messages.length > MAX_MEMORY 
            ? messages.slice(-MAX_MEMORY) 
            : messages;

        const messagesArray = [useCase.MESSAGE, ...userMessagesArray];

        const response = await chatCompletion(messagesArray, useCase.MAX_TOKENS, useCase.TEMPERATURE);
        
        return NextResponse.json(response);

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'OpenAI Error' }, { status: 500 });
    }
}