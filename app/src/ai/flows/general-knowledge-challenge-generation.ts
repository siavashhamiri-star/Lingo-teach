'use server';

/**
 * @fileOverview Generates general knowledge challenge questions based on a difficulty level.
 *
 * - generateGeneralKnowledgeChallenge - A function that generates a general knowledge challenge.
 * - GeneralKnowledgeChallengeInput - The input type for the generateGeneralKnowledgeChallenge function.
 * - GeneralKnowledgeChallengeOutput - The return type for the generateGeneralKnowledgeChallenge function.
 */

import { z } from 'zod';
import { ai } from '../genkit';

const GeneralKnowledgeChallengeInputSchema = z.object({
  difficulty: z
    .number()
    .min(1)
    .max(10)
    .describe(
      'The difficulty level for the question, from 1 (very easy) to 10 (very hard).'
    ),
});
export type GeneralKnowledgeChallengeInput = z.infer<typeof GeneralKnowledgeChallengeInputSchema>;

const GeneralKnowledgeChallengeOutputSchema = z.object({
  question: z.string().describe('The generated general knowledge question.'),
  answer: z.string().describe('The correct answer to the question.'),
});
export type GeneralKnowledgeChallengeOutput = z.infer<typeof GeneralKnowledgeChallengeOutputSchema>;

const generalKnowledgeChallengePrompt = ai.definePrompt({
    name: 'generalKnowledgeChallengePrompt',
    input: { schema: GeneralKnowledgeChallengeInputSchema },
    output: { schema: GeneralKnowledgeChallengeOutputSchema },
    model: 'gemini-1.5-flash',
    prompt: `You are a quiz master. Generate one engaging general knowledge question (in any field like science, history, arts, etc.) appropriate for the specified difficulty level, along with its answer.

Difficulty Level (1-10): {{{difficulty}}}

The question should be in English.
Output should be a JSON object with 'question' and 'answer'.`,
});

const generalKnowledgeChallengeFlow = ai.defineFlow(
  {
    name: 'generalKnowledgeChallengeFlow',
    inputSchema: GeneralKnowledgeChallengeInputSchema,
    outputSchema: GeneralKnowledgeChallengeOutputSchema,
  },
  async (input) => {
    const { output } = await generalKnowledgeChallengePrompt(input);
    return output!;
  }
);

export async function generateGeneralKnowledgeChallenge(
  input: GeneralKnowledgeChallengeInput
): Promise<GeneralKnowledgeChallengeOutput> {
  return generalKnowledgeChallengeFlow(input);
}
