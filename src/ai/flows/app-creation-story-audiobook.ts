'use server';

/**
 * @fileOverview A Genkit flow for generating an audiobook telling the creation story of the LinguaWeave app.
 *
 * - generateCreationStoryAudiobook - Creates a narrative text and converts it to audio.
 * - CreationStoryAudiobookOutput - The return type for the flow.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import wav from 'wav';

const CreationStoryAudiobookOutputSchema = z.object({
  storyText: z.string().describe('The narrative story of the app\'s creation and philosophy.'),
  audioDataUri: z.string().describe('A data URI for the generated WAV audio file of the story.'),
});
export type CreationStoryAudiobookOutput = z.infer<typeof CreationStoryAudiobookOutputSchema>;

export async function generateCreationStoryAudiobook(): Promise<CreationStoryAudiobookOutput> {
  return creationStoryAudiobookFlow();
}


const storyGenerationPrompt = ai.definePrompt({
  name: 'creationStoryPrompt',
  output: { schema: z.object({ storyText: z.string() })},
  prompt: `You are a master storyteller. Write a short, engaging, and inspiring story about the creation of an educational ecosystem called "Afarinesh".

The story should cover these key philosophical points:
1.  The ecosystem starts with a language app, "LinguaWeave," but its vision is much larger, leading to a virtual city called "Tavana."
2.  The core idea is to combat scientific stagnation in academia through a model of "Dynamic Meritocracy."
3.  Introduce the "Duel of Scientific Synergy": When a brilliant student proves their mastery, it triggers a respectful, *optional* duel suggestion between their professor and a peer. This is not a challenge to shame, but a confidential opportunity for mutual growth.
4.  This duel becomes the greatest "workshop for knowledge creation," where the process itself creates a "genetic leap" in science, benefiting all students.
5.  Students are not just learners; they are citizens of this ecosystem. By contributing, they are building the dream city of "Tavana" brick by brick, and in doing so, achieving their own dreams.
6.  The highest honor is a seat on the "Emperor's Council," which grants leadership roles (like in the "Foreign Languages Association of Tavana"), financial rewards, and a voice in the future of the ecosystem.

Weave these concepts into a compelling narrative, starting from the spark of the idea to the grand vision of a new civilization. Make it sound like a legend being told.
  `,
});

async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate,
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

const creationStoryAudiobookFlow = ai.defineFlow(
  {
    name: 'creationStoryAudiobookFlow',
    outputSchema: CreationStoryAudiobookOutputSchema,
  },
  async () => {
    // 1. Generate the story text
    const { output: textOutput } = await storyGenerationPrompt({});
    if (!textOutput?.storyText) {
      throw new Error('Failed to generate the story text.');
    }
    const { storyText } = textOutput;

    // 2. Generate the source audio using TTS with a narrative voice
    const { media } = await ai.generate({
        model: 'googleai/gemini-2.5-flash-preview-tts',
        config: {
          responseModalities: ['AUDIO'],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Calvus' }, // A good narrative voice
            },
          },
        },
        prompt: storyText,
      });

    if (!media) {
      throw new Error('Failed to generate the audiobook audio.');
    }
    
    // 3. Convert PCM audio to WAV
    const audioBuffer = Buffer.from(
      media.url.substring(media.url.indexOf(',') + 1),
      'base64'
    );
    const audioDataUri = 'data:audio/wav;base64,' + (await toWav(audioBuffer));

    // 4. Return the final output
    return {
      storyText,
      audioDataUri,
    };
  }
);
