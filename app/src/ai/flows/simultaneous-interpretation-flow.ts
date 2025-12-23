'use server';

/**
 * @fileOverview A Genkit flow for generating simultaneous interpretation practice scenarios.
 *
 * - generateInterpretationScenario - Creates a source text and audio for a specific topic.
 * - InterpretationScenarioInput - The input type for the flow.
 * - InterpretationScenarioOutput - The return type for the flow.
 */

import { z } from 'zod';
import { ai } from '../genkit';
import wav from 'wav';
import { googleAI } from '@genkit-ai/google-genai';

const InterpretationScenarioInputSchema = z.object({
  topic: z.string().describe('The topic for the interpretation (e.g., "News Broadcast", "Business Meeting").'),
  language: z.enum(['English', 'Persian']).describe('The source language of the text.'),
});
export type InterpretationScenarioInput = z.infer<typeof InterpretationScenarioInputSchema>;

const InterpretationScenarioOutputSchema = z.object({
  sourceText: z.string().describe('The full source text for the user to interpret.'),
  sourceAudioDataUri: z.string().describe('A data URI for the generated WAV audio file of the source text.'),
});
export type InterpretationScenarioOutput = z.infer<typeof InterpretationScenarioOutputSchema>;

const textPrompt = ai.definePrompt({
    name: 'interpretationTextPrompt',
    input: { schema: InterpretationScenarioInputSchema },
    output: { schema: z.object({ sourceText: z.string() }) },
    prompt: `You are an expert content creator for language learners. Generate a short, clear, and informative text (about 100-150 words) on the given topic in the specified language. The text should be suitable for a simultaneous interpretation exercise.

Topic: "{{{topic}}}"
Language: {{{language}}}

Generate the text now.`,
});

const interpretationFlow = ai.defineFlow(
  {
    name: 'interpretationFlow',
    inputSchema: InterpretationScenarioInputSchema,
    outputSchema: InterpretationScenarioOutputSchema,
  },
  async (input) => {
    // 1. Generate the source text
    const { output: textOutput } = await ai.generate({
      model: googleAI.model('gemini-1.5-flash'),
      custom: {
        prompt: textPrompt,
        promptInput: input
      }
    });

    if (!textOutput?.sourceText) {
      throw new Error('Failed to generate source text for the scenario.');
    }
    const { sourceText } = textOutput;

    // 2. Generate the source audio using TTS
    const { media } = await ai.generate({
      model: googleAI.model('gemini-2.5-flash-preview-tts'),
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: input.language === 'Persian' ? 'Cursa' : 'Caelum' },
          },
        },
      },
      prompt: sourceText,
    });
    
    if (!media) {
      throw new Error('Failed to generate source audio.');
    }
    
    const audioBuffer = Buffer.from(media.url.substring(media.url.indexOf(',') + 1), 'base64');
    
    // 3. Convert PCM audio to WAV
    const audioDataUri = 'data:audio/wav;base64,' + (await toWav(audioBuffer));

    // 4. Return the final output
    return {
      sourceText,
      sourceAudioDataUri: audioDataUri,
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

export async function generateInterpretationScenario(
  input: InterpretationScenarioInput
): Promise<InterpretationScenarioOutput> {
  return interpretationFlow(input);
}
