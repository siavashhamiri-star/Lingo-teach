'use server';

/**
 * @fileOverview Generates a weekly translation exercise tailored to the user's language level.
 *
 * - generateWeeklyTranslationExercise - A function that generates the translation exercise.
 * - WeeklyTranslationExerciseInput - The input type for the generateWeeklyTranslationExercise function.
 * - WeeklyTranslationExerciseOutput - The return type for the generateWeeklyTranslationExercise function.
 */

import { z } from 'zod';
import { ai } from '../genkit';
import { googleAI } from '@genkit-ai/google-genai';

const WeeklyTranslationExerciseInputSchema = z.object({
  languageLevel: z
    .number()
    .min(1)
    .max(160)
    .describe("The user's language level (1-160)."),
  targetLanguage: z
    .enum(['en', 'fa'])
    .describe('The target language for translation (en: English, fa: Persian).'),
});
export type WeeklyTranslationExerciseInput = z.infer<
  typeof WeeklyTranslationExerciseInputSchema
>;

const WeeklyTranslationExerciseOutputSchema = z.object({
  persianText: z.string().describe('The Persian text for translation.'),
  englishText: z.string().describe('The English text for translation.'),
});
export type WeeklyTranslationExerciseOutput = z.infer<
  typeof WeeklyTranslationExerciseOutputSchema
>;

const translationExercisePrompt = ai.definePrompt({
    name: 'translationExercisePrompt',
    input: { schema: WeeklyTranslationExerciseInputSchema },
    output: { schema: WeeklyTranslationExerciseOutputSchema },
    prompt: `You are an expert language tutor. Generate a translation exercise with texts in both Persian and English based on the user's language level and target language.

Language Level: {{{languageLevel}}}
Target Language: {{{targetLanguage}}}

Instructions: Provide a Persian text and its English translation, suitable for the specified language level. The texts should be related to a common topic or theme. Ensure that the complexity of the vocabulary and grammar is appropriate for the given language level.
`,
});


const weeklyTranslationExerciseFlow = ai.defineFlow(
  {
    name: 'weeklyTranslationExerciseFlow',
    inputSchema: WeeklyTranslationExerciseInputSchema,
    outputSchema: WeeklyTranslationExerciseOutputSchema,
  },
  async (input) => {
    const { output } = await ai.generate({
      model: googleAI.model('gemini-1.5-flash'),
      custom: {
        prompt: translationExercisePrompt,
        promptInput: input
      }
    });
    return output!;
  }
);


export async function generateWeeklyTranslationExercise(
  input: WeeklyTranslationExerciseInput
): Promise<WeeklyTranslationExerciseOutput> {
  return weeklyTranslationExerciseFlow(input);
}
