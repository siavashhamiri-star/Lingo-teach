'use server';
/**
 * @fileOverview Identifies an object in an image and provides its name and pronunciation in English and Persian.
 *
 * - identifyObject - A function that handles the object identification process.
 * - IdentifyObjectInput - The input type for the identifyObject function.
 * - IdentifyObjectOutput - The return type for the identifyObject function.
 */

import { z } from 'zod';
import { ai } from '../genkit';
import wav from 'wav';
import { googleAI } from '@genkit-ai/google-genai';

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
  englishAudio: z.string().describe('The base64 encoded WAV audio of the English name.'),
  persianAudio: z.string().describe('The base64 encoded WAV audio of the Persian name.'),
});
export type IdentifyObjectOutput = z.infer<typeof IdentifyObjectOutputSchema>;

const textToSpeechFlow = ai.defineFlow(
  {
    name: 'objectTextToSpeechFlow',
    inputSchema: z.object({ text: z.string(), voiceName: z.string() }),
    outputSchema: z.string(),
  },
  async ({ text, voiceName }) => {
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
      throw new Error('no media returned');
    }
    const audioBuffer = Buffer.from(media.url.substring(media.url.indexOf(',') + 1), 'base64');
    return 'data:audio/wav;base64,' + (await toWav(audioBuffer));
  }
);

const identificationPrompt = ai.definePrompt({
    name: 'identificationPrompt',
    output: {
        schema: z.object({
            englishName: z.string(),
            persianName: z.string(),
        })
    },
    prompt: `You are an expert at identifying objects in images. Analyze the image provided and identify the main object. Provide the name of the object in both English and Persian.
        Output only the JSON object with the identified names.`
});

const identifyObjectFlow = ai.defineFlow(
  {
    name: 'identifyObjectFlow',
    inputSchema: IdentifyObjectInputSchema,
    outputSchema: IdentifyObjectOutputSchema,
  },
  async (input) => {
    const { output } = await identificationPrompt({}, {
        model: googleAI.model('gemini-1.5-flash'),
        prompt: [{
            media: { url: input.imageDataUri }
        }]
    });

    if (!output) {
      throw new Error('Failed to identify object in the image.');
    }

    // Generate audio for English name
    const englishAudio = await textToSpeechFlow({ text: output.englishName, voiceName: 'Algenib' });


    // Generate audio for Persian name
    const persianAudio = await textToSpeechFlow({ text: output.persianName, voiceName: 'Achernar' });

    return {
      englishName: output.englishName,
      persianName: output.persianName,
      englishAudio: englishAudio,
      persianAudio: persianAudio,
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

export async function identifyObject(input: IdentifyObjectInput): Promise<IdentifyObjectOutput> {
  return identifyObjectFlow(input);
}
