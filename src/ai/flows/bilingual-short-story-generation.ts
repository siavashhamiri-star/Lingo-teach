
'use server';
/**
 * @fileOverview Generates a bilingual short story in Persian and English, with sentence-by-sentence audio.
 *
 * - generateBilingualShortStory - A function that generates and reads aloud a bilingual short story.
 * - BilingualShortStoryInput - The input type for the generateBilingualShortStory function.
 * - BilingualShortStoryOutput - The return type for the generateBilingualShortStory function.
 */

import { z } from 'zod';
import { ai } from '../genkit';
import wav from 'wav';
import { googleAI } from '@genkit-ai/google-genai';

const BilingualShortStoryInputSchema = z.object({
  userLanguageLevel: z
    .number()
    .describe(
      'The user language level, a number between 1 and 160, where 1 is beginner and 160 is advanced.'
    ),
});
export type BilingualShortStoryInput = z.infer<typeof BilingualShortStoryInputSchema>;

const SentencePairSchema = z.object({
  englishSentence: z.string().describe('A single sentence from the story in English.'),
  persianSentence: z.string().describe('The direct translation of that sentence in Persian.'),
});

const StoryTextSchema = z.object({
  title: z.string().describe('The title of the story in English.'),
  story: z.array(SentencePairSchema).describe('The story, broken down into sentence pairs.'),
});

const BilingualShortStoryOutputSchema = z.object({
  title: z.string().describe('The title of the story in English.'),
  story: z
    .array(
      z.object({
        englishSentence: z.string(),
        persianSentence: z.string(),
        englishAudio: z.string().describe('A data URI for the WAV audio of the English sentence.'),
        persianAudio: z.string().describe('A data URI for the WAV audio of the Persian sentence.'),
      })
    )
    .describe(
      'An array of sentence pairs, each containing the English and Persian sentence and their corresponding audio.'
    ),
});
export type BilingualShortStoryOutput = z.infer<typeof BilingualShortStoryOutputSchema>;


const textToSpeechFlow = ai.defineFlow(
  {
    name: 'bilingualStoryTextToSpeechFlow',
    inputSchema: z.object({ text: z.string(), voiceName: z.string() }),
    outputSchema: z.string(),
  },
  async ({ text, voiceName }) => {
    if (!text || !text.trim()) {
      return '';
    }
    const { media } = await ai.generate({
      model: googleAI.model('gemini-2.5-flash-preview-tts'),
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName },
          },
        },
      },
      prompt: text,
    });

    if (!media) {
      return '';
    }

    const audioBuffer = Buffer.from(media.url.substring(media.url.indexOf(',') + 1), 'base64');
    return 'data:audio/wav;base64,' + (await toWav(audioBuffer));
  }
);

const storyPrompt = ai.definePrompt({
    name: 'bilingualStoryPrompt',
    input: { schema: BilingualShortStoryInputSchema },
    output: { schema: StoryTextSchema },
    prompt: `You are a bilingual storyteller fluent in English and Persian.

  Generate a short story with a title, appropriate for language level {{{userLanguageLevel}}}.
  The story should be broken down into individual sentences. For each English sentence, provide a corresponding Persian translation.
  The output should be a JSON object with a 'title' and a 'story' array, where each element in the array is an object with 'englishSentence' and 'persianSentence'.
  The story should be between 5 to 8 sentences long.`,
});

const bilingualShortStoryFlow = ai.defineFlow(
  {
    name: 'bilingualShortStoryFlow',
    inputSchema: BilingualShortStoryInputSchema,
    outputSchema: BilingualShortStoryOutputSchema,
  },
  async (input) => {
    const { output: storyOutput } = await storyPrompt(input, { model: googleAI.model('gemini-1.5-flash') });

    if (!storyOutput?.story) {
      throw new Error('Failed to generate bilingual short story text.');
    }

    const processedStory = await Promise.all(
      storyOutput.story.map(async (sentencePair) => {
        const [englishAudio, persianAudio] = await Promise.all([
          textToSpeechFlow({
            text: sentencePair.englishSentence,
            voiceName: 'Algenib',
          }),
          textToSpeechFlow({
            text: sentencePair.persianSentence,
            voiceName: 'Achernar',
          }),
        ]);
        return {
          ...sentencePair,
          englishAudio: englishAudio,
          persianAudio: persianAudio,
        };
      })
    );

    return {
      title: storyOutput.title,
      story: processedStory,
    };
  }
);


async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    let bufs = [] as any[];
    writer.on('error', reject);
    writer.on('data', function (d) {
      bufs.push(d);
    });
    writer.on('end', function () {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}

export async function generateBilingualShortStory(
  input: BilingualShortStoryInput
): Promise<BilingualShortStoryOutput> {
  return bilingualShortStoryFlow(input);
}
