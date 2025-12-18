'use server';
/**
 * @fileOverview Generates a bilingual short story in Persian and English, with sentence-by-sentence audio.
 *
 * - generateBilingualShortStory - A function that generates and reads aloud a bilingual short story.
 * - BilingualShortStoryInput - The input type for the generateBilingualShortStory function.
 * - BilingualShortStoryOutput - The return type for the generateBilingualShortStory function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import wav from 'wav';

const BilingualShortStoryInputSchema = z.object({
  userLanguageLevel: z
    .number()
    .describe(
      'The user language level, a number between 1 and 160, where 1 is beginner and 160 is advanced.'
    ),
});
export type BilingualShortStoryInput = z.infer<typeof BilingualShortStoryInputSchema>;

const SentencePairSchema = z.object({
    englishSentence: z.string().describe("A single sentence from the story in English."),
    persianSentence: z.string().describe("The direct translation of that sentence in Persian."),
});

const BilingualShortStoryOutputSchema = z.object({
  title: z.string().describe("The title of the story in English."),
  story: z.array(z.object({
      englishSentence: z.string(),
      persianSentence: z.string(),
      englishAudio: z.string().describe("The base64 encoded WAV audio of the English sentence."),
      persianAudio: z.string().describe("The base64 encoded WAV audio of the Persian sentence."),
  })).describe("An array of sentence pairs, each containing the English and Persian sentence and their corresponding audio.")
});
export type BilingualShortStoryOutput = z.infer<typeof BilingualShortStoryOutputSchema>;

export async function generateBilingualShortStory(
  input: BilingualShortStoryInput
): Promise<BilingualShortStoryOutput> {
  return bilingualShortStoryFlow(input);
}

const bilingualShortStoryPrompt = ai.definePrompt({
  name: 'bilingualShortStoryPrompt',
  input: {schema: BilingualShortStoryInputSchema},
  output: {
    schema: z.object({
      title: z.string(),
      story: z.array(SentencePairSchema),
    }),
  },
  prompt: `You are a bilingual storyteller fluent in English and Persian.

  Generate a short story with a title, appropriate for language level {{{userLanguageLevel}}}.
  The story should be broken down into individual sentences. For each English sentence, provide a corresponding Persian translation.
  The output should be a JSON object with a 'title' and a 'story' array, where each element in the array is an object with 'englishSentence' and 'persianSentence'.
  The story should be between 5 to 8 sentences long.`,
});

async function textToSpeech(text: string, voiceName: string): Promise<string> {
  // Return empty string if text is empty to avoid API errors.
  if (!text.trim()) {
    return '';
  }
  const {media} = await ai.generate({
    model: 'googleai/gemini-2.5-flash-preview-tts',
    config: {
      responseModalities: ['AUDIO'],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: {voiceName: voiceName},
        },
      },
    },
    prompt: text,
  });
  if (!media) {
    // Instead of throwing an error, we can return an empty string or handle it gracefully.
    console.warn(`TTS failed for text: "${text}"`);
    return '';
  }
  const audioBuffer = Buffer.from(
    media.url.substring(media.url.indexOf(',') + 1),
    'base64'
  );
  return 'data:audio/wav;base64,' + (await toWav(audioBuffer));
}

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

const bilingualShortStoryFlow = ai.defineFlow(
  {
    name: 'bilingualShortStoryFlow',
    inputSchema: BilingualShortStoryInputSchema,
    outputSchema: BilingualShortStoryOutputSchema,
  },
  async input => {
    const {output} = await bilingualShortStoryPrompt(input);

    if (!output?.story) {
      throw new Error('Failed to generate bilingual short story text.');
    }

    const processedStory = await Promise.all(
        output.story.map(async (sentencePair) => {
            const [englishAudio, persianAudio] = await Promise.all([
                textToSpeech(sentencePair.englishSentence, 'Alfred'),
                textToSpeech(sentencePair.persianSentence, 'Leyla'),
            ]);
            return {
                ...sentencePair,
                englishAudio,
                persianAudio,
            };
        })
    );

    return {
      title: output.title,
      story: processedStory,
    };
  }
);
