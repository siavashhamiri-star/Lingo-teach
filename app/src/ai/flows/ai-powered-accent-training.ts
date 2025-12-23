'use server';

/**
 * @fileOverview An AI-powered accent training flow.
 *
 * - analyzePronunciation - A function that handles the pronunciation analysis and feedback process.
 * - AnalyzePronunciationInput - The input type for the analyzePronunciation function.
 * - AnalyzePronunciationOutput - The return type for the analyzePronunciation function.
 */

import { z } from 'zod';
import { ai } from '../genkit';
import { googleAI } from '@genkit-ai/google-genai';

const AnalyzePronunciationInputSchema = z.object({
  audioDataUri: z
    .string()
    .describe(
      "The user's pronunciation as an audio data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  textToPronounce: z.string().describe('The text that the user is pronouncing.'),
  nativeLanguage: z.string().describe('The native language of the user.'),
  targetLanguage: z.string().describe('The target language the user is learning.'),
});
export type AnalyzePronunciationInput = z.infer<typeof AnalyzePronunciationInputSchema>;

const AnalyzePronunciationOutputSchema = z.object({
  pronunciationScore: z
    .number()
    .describe(
      'A score from 0 to 1 indicating the accuracy of the pronunciation, where 1 is perfect.'
    ),
  feedback: z.string().describe('Detailed feedback on the pronunciation, including specific areas for improvement.'),
  visualAidDataUri: z
    .string()
    .optional()
    .describe(
      "An optional data URI for a visual aid (image or video) that shows mouth and tongue placement.  It must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type AnalyzePronunciationOutput = z.infer<typeof AnalyzePronunciationOutputSchema>;

const analyzePronunciationPrompt = ai.definePrompt(
  {
    name: 'analyzePronunciationPrompt',
    input: { schema: AnalyzePronunciationInputSchema },
    output: { schema: AnalyzePronunciationOutputSchema },
    prompt: `You are an AI-powered accent coach that specializes in analyzing pronunciation in real-time and providing feedback.

You will analyze the user's pronunciation of the following text:
{{{textToPronounce}}}

The user's native language is: {{{nativeLanguage}}}
The target language is: {{{targetLanguage}}}

You will provide a pronunciation score from 0 to 1, where 1 is perfect.

You will also provide detailed feedback on the pronunciation, including specific areas for improvement.

If possible, you will also provide a visual aid (image or video) that shows mouth and tongue placement as a data URI.

Consider the user's native language when providing feedback, and focus on the aspects of pronunciation that are most difficult for speakers of that language.

User's audio is attached.`,
  },
);


const analyzePronunciationFlow = ai.defineFlow(
  {
    name: 'analyzePronunciationFlow',
    inputSchema: AnalyzePronunciationInputSchema,
    outputSchema: AnalyzePronunciationOutputSchema,
  },
  async (input) => {
    const { output } = await analyzePronunciationPrompt.generate({
        input,
        model: googleAI.model('gemini-1.5-flash'),
        prompt: {
            media: [{ url: input.audioDataUri }]
        }
    });

    return output!;
  }
);


export async function analyzePronunciation(
  input: AnalyzePronunciationInput
): Promise<AnalyzePronunciationOutput> {
  return analyzePronunciationFlow(input);
}
