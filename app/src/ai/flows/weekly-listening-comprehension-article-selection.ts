'use server';

/**
 * @fileOverview This file defines a Genkit flow for selecting a relevant article,
 * speech, or news segment each week based on the user's language level for listening comprehension practice.
 *
 * - selectWeeklyArticle - A function that selects a weekly listening comprehension article.
 * - SelectWeeklyArticleInput - The input type for the selectWeeklyArticle function.
 * - SelectWeeklyArticleOutput - The return type for the selectWeeklyArticle function.
 */

import { z } from 'zod';
import { ai } from '../genkit';
import { googleAI } from '@genkit-ai/google-genai';

const SelectWeeklyArticleInputSchema = z.object({
  languageLevel: z
    .number()
    .min(1)
    .max(160)
    .describe(
      'The user language level, where 1 is beginner and 160 is advanced.'
    ),
  targetLanguage: z
    .enum(['en', 'fa'])
    .describe('The target language for listening comprehension (en = English, fa = Persian).'),
});
export type SelectWeeklyArticleInput = z.infer<typeof SelectWeeklyArticleInputSchema>;

const SelectWeeklyArticleOutputSchema = z.object({
  articleTitle: z.string().describe('The title of the selected article.'),
  articleContent: z.string().describe('The content of the selected article.'),
  articleSource: z.string().describe('The source of the selected article.'),
  articleType: z
    .enum(['article', 'speech', 'news'])
    .describe('The type of the selected article.'),
});
export type SelectWeeklyArticleOutput = z.infer<typeof SelectWeeklyArticleOutputSchema>;

const weeklyArticlePrompt = ai.definePrompt({
    name: 'weeklyArticlePrompt',
    input: { schema: SelectWeeklyArticleInputSchema },
    output: { schema: SelectWeeklyArticleOutputSchema },
    prompt: `You are an AI that selects a relevant article, speech, or news segment for users to practice their listening comprehension skills in the target language.

  The user's language level is: {{{languageLevel}}}
  The target language is: {{{targetLanguage}}}

  Please select an appropriate article, speech, or news segment based on the user's language level and target language. The article type should be suited for improving listening comprehension skills.
  Return the title, content, source, and the type of the selected article in the output schema format.
  Do not include any additional information other than what is specified in the output schema.`,
});

const selectWeeklyArticleFlow = ai.defineFlow(
  {
    name: 'selectWeeklyArticleFlow',
    inputSchema: SelectWeeklyArticleInputSchema,
    outputSchema: SelectWeeklyArticleOutputSchema,
  },
  async (input) => {
    const { output } = await weeklyArticlePrompt(input, { model: googleAI.model('gemini-1.5-flash') });

    return output!;
  }
);

export async function selectWeeklyArticle(
  input: SelectWeeklyArticleInput
): Promise<SelectWeeklyArticleOutput> {
  return selectWeeklyArticleFlow(input);
}
