'use server';
/**
 * @fileOverview Generates a bilingual short story in Persian and English, read aloud in both languages.
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
  userTargetLanguage: z
    .enum(['en', 'fa'])
    .describe('The target language of the user, either English (en) or Persian (fa).'),
});
export type BilingualShortStoryInput = z.infer<typeof BilingualShortStoryInputSchema>;

const BilingualShortStoryOutputSchema = z.object({
  englishStory: z.string().describe('The short story in English.'),
  persianStory: z.string().describe('The short story in Persian.'),
  englishAudio: z.string().describe('The base64 encoded audio of the story read in English.'),
  persianAudio: z.string().describe('The base64 encoded audio of the story read in Persian.'),
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
      englishStory: z.string(),
      persianStory: z.string(),
    }),
  },
  prompt: `You are a bilingual storyteller fluent in English and Persian.

  Generate a short story, appropriate for language level {{{userLanguageLevel}}}, in both English and Persian.

  English Story:
  {{englishStory}}

  Persian Story:
  {{persianStory}}`,
});

async function textToSpeech(text: string, voiceName: string): Promise<string> {
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
    throw new Error('no media returned');
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

    if (!output) {
      throw new Error('Failed to generate bilingual short story.');
    }

    // Generate audio for English story
    const englishAudio = await textToSpeech(output.englishStory, 'Alfred');

    // Generate audio for Persian story
    const persianAudio = await textToSpeech(output.persianStory, 'Leyla');

    return {
      englishStory: output.englishStory,
      persianStory: output.persianStory,
      englishAudio: englishAudio,
      persianAudio: persianAudio,
    };
  }
);
