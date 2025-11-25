'use server';
/**
 * @fileOverview Identifies an object in an image and provides its name and pronunciation in English and Persian.
 *
 * - identifyObject - A function that handles the object identification process.
 * - IdentifyObjectInput - The input type for the identifyObject function.
 * - IdentifyObjectOutput - The return type for the identifyObject function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import wav from 'wav';

const IdentifyObjectInputSchema = z.object({
  imageDataUri: z
    .string()
    .describe(
      "A photo of an object, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type IdentifyObjectInput = z.infer<typeof IdentifyObjectInputSchema>;

const IdentifyObjectOutputSchema = z.object({
  englishName: z.string().describe('The name of the object in English.'),
  persianName: z.string().describe('The name of the object in Persian.'),
  englishAudio: z
    .string()
    .describe('The base64 encoded WAV audio of the English name.'),
  persianAudio: z
    .string()
    .describe('The base64 encoded WAV audio of the Persian name.'),
});
export type IdentifyObjectOutput = z.infer<typeof IdentifyObjectOutputSchema>;

export async function identifyObject(
  input: IdentifyObjectInput
): Promise<IdentifyObjectOutput> {
  return identifyObjectFlow(input);
}

const identifyObjectPrompt = ai.definePrompt({
  name: 'identifyObjectPrompt',
  input: {schema: IdentifyObjectInputSchema},
  output: {
    schema: z.object({
      englishName: z.string(),
      persianName: z.string(),
    }),
  },
  prompt: `You are an expert at identifying objects in images. Analyze the image provided and identify the main object. Provide the name of the object in both English and Persian.

  Image: {{media url=imageDataUri}}

  Output only the JSON object with the identified names.`,
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

const identifyObjectFlow = ai.defineFlow(
  {
    name: 'identifyObjectFlow',
    inputSchema: IdentifyObjectInputSchema,
    outputSchema: IdentifyObjectOutputSchema,
  },
  async input => {
    const {output} = await identifyObjectPrompt(input);

    if (!output) {
      throw new Error('Failed to identify object in the image.');
    }

    // Generate audio for English name
    const englishAudio = await textToSpeech(output.englishName, 'Alfred');

    // Generate audio for Persian name
    const persianAudio = await textToSpeech(output.persianName, 'Leyla');

    return {
      englishName: output.englishName,
      persianName: output.persianName,
      englishAudio: englishAudio,
      persianAudio: persianAudio,
    };
  }
);
