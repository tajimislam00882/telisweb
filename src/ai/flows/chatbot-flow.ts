'use server';
/**
 * @fileOverview A simple chatbot flow for answering user questions.
 *
 * - chat - A function that takes conversation history and returns a response.
 * - ChatInput - The input type for the chat function.
 * - ChatOutput - The return type for the chat function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const ChatInputSchema = z.object({
    history: z.array(z.object({
        role: z.enum(['user', 'model']),
        content: z.string(),
    })).describe("The conversation history."),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

const ChatOutputSchema = z.object({
  response: z.string().describe('The chatbot\'s response.'),
});
export type ChatOutput = z.infer<typeof ChatOutputSchema>;


export async function chat(input: ChatInput): Promise<ChatOutput> {
  return chatbotFlow(input);
}


const prompt = ai.definePrompt({
    name: 'chatbotPrompt',
    input: { schema: ChatInputSchema },
    output: { schema: ChatOutputSchema },
    prompt: `You are a friendly and helpful customer support assistant for a digital product marketplace named Telisweb. Your goal is to answer user questions about the products and services.

Keep your answers concise and helpful. If you don't know the answer, say "I'm sorry, I don't have information about that. You can contact our support team at support@telisweb.com".

Here is the conversation history:
{{#each history}}
{{role}}: {{{content}}}
{{/each}}
model:`,
});


const chatbotFlow = ai.defineFlow(
  {
    name: 'chatbotFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('Failed to generate a chat response.');
    }
    return { response: output.response };
  }
);
