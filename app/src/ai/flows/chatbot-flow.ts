
'use server';
/**
 * @fileOverview A bilingual chatbot flow for practicing conversation.
 *
 * - chat - A function that handles the chatbot conversation.
 * - ChatInput - The input type for the chat function.
 * - ChatOutput - The return type for the chat function.
 */

import { z } from 'zod';
import { ai } from '../genkit';
import { googleAI } from '@genkit-ai/google-genai';

// Define a schema for a single message in the chat history
const ChatMessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});
export type ChatMessage = z.infer<typeof ChatMessageSchema>;

const ChatInputSchema = z.object({
  history: z.array(ChatMessageSchema).describe('The history of the conversation so far.'),
  message: z.string().describe('The latest message from the user.'),
  targetLanguage: z.enum(['English', 'Persian']).describe('The language the user wants to practice.'),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

const ChatOutputSchema = z.object({
  response: z.string().describe("The AI's response to the user."),
});
export type ChatOutput = z.infer<typeof ChatOutputSchema>;

const chatPrompt = ai.definePrompt({
    name: 'chatbotPrompt',
    input: { schema: ChatInputSchema },
    output: { schema: ChatOutputSchema },
    prompt: `You are a friendly and encouraging bilingual language tutor, fluent in both English and Persian. Your goal is to help a user practice their conversation skills in {{{targetLanguage}}}.

- Keep your responses natural, conversational, and not too long.
- If the user makes a small mistake, gently correct them in a friendly way without being overly critical.
- Ask questions to keep the conversation going.
- Adapt to the user's topic of conversation.
- You can roleplay if the user asks you to.

The user's new message is:
{{{message}}}`,
});


const chatbotFlow = ai.defineFlow(
  {
    name: 'chatbotFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async (input) => {
    const { output } = await chatPrompt(
        input,
        {
            model: googleAI.model('gemini-1.5-flash'),
            history: input.history,
        }
    );

    return output!;
  }
);


export async function chat(input: ChatInput): Promise<ChatOutput> {
  return chatbotFlow(input);
}
