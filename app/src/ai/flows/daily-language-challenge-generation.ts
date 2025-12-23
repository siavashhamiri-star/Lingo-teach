'use server';

/**
 * @fileOverview Generates daily language challenge questions based on the user's language level.
 *
 * - generateDailyChallenge - A function that generates a daily language challenge.
 * - DailyChallengeInput - The input type for the generateDailyChallenge function.
 * - DailyChallengeOutput - The return type for the generateDailyChallenge function.
 */

import { z } from 'zod';
import { ai } from '../genkit';
import { googleAI } from '@genkit-ai/google-genai';

const DailyChallengeInputSchema = z.object({
  languageLevel: z
    .number()
    .min(1)
    .max(160)
    .describe(
      'The language proficiency level of the user, from 1 (beginner) to 160 (advanced).'
    ),
  targetLanguage: z
    .enum(['English', 'Persian'])
    .describe('The target language for the challenge.'),
});
export type DailyChallengeInput = z.infer<typeof DailyChallengeInputSchema>;

const DailyChallengeOutputSchema = z.object({
  question: z.string().describe('The generated language challenge question.'),
  answer: z.string().describe('The expected answer to the challenge question.'),
});
export type DailyChallengeOutput = z.infer<typeof DailyChallengeOutputSchema>;

const dailyChallengePrompt = ai.definePrompt({
    name: 'dailyChallengePrompt',
    input: { schema: DailyChallengeInputSchema },
    output: { schema: DailyChallengeOutputSchema },
    prompt: `You are a language challenge generator for a user learning {{{targetLanguage}}}. The user's language level is {{{languageLevel}}}. Generate one challenging and engaging question appropriate for this level, along with its answer.`,
});

const dailyChallengeFlow = ai.defineFlow(
  {
    name: 'dailyChallengeFlow',
    inputSchema: DailyChallengeInputSchema,
    outputSchema: DailyChallengeOutputSchema,
  },
  async (input) => {
    const { output } = await dailyChallengePrompt.generate({ input, model: googleAI.model('gemini-1.5-flash') });
    return output!;
  }
);

export async function generateDailyChallenge(
  input: DailyChallengeInput
): Promise<DailyChallengeOutput> {
  return dailyChallengeFlow(input);
}
