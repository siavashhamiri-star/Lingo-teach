'use server';

/**
 * @fileOverview A Genkit flow for generating multi-speaker audio role-playing scenarios.
 *
 * - generateRoleplayScene - A function that creates a script and audio for a conversational scene.
 * - RoleplaySceneInput - The input type for the generateRoleplayScene function.
 * - RoleplaySceneOutput - The return type for the generateRoleplayScene function.
 */

import { z } from 'zod';
import { ai } from '../genkit';
import wav from 'wav';
import { googleAI } from '@genkit-ai/google-genai';


const RoleplaySceneInputSchema = z.object({
  scenario: z.string().describe('The topic or situation for the role-play (e.g., "ordering coffee").'),
  targetLanguage: z.enum(['English', 'Persian']).describe('The primary language for the conversation.'),
});
export type RoleplaySceneInput = z.infer<typeof RoleplaySceneInputSchema>;

const ScriptLineSchema = z.object({
  speaker: z
    .string()
    .describe('The speaker of the line (e.g., "User", "Barista"). Should be one of two speakers, User and another character.'),
  line: z.string().describe('The content of the dialogue line.'),
});

const RoleplaySceneOutputSchema = z.object({
  script: z.array(ScriptLineSchema).describe('The full dialogue script, with each line assigned to a speaker.'),
  audioDataUri: z.string().describe('A data URI for the generated WAV audio file of the entire conversation.'),
});
export type RoleplaySceneOutput = z.infer<typeof RoleplaySceneOutputSchema>;


const scriptPrompt = ai.definePrompt({
    name: 'scriptPrompt',
    input: { schema: RoleplaySceneInputSchema },
    output: {
        schema: z.object({
            script: z.array(ScriptLineSchema)
        })
    },
    prompt: `You are a creative scriptwriter. Generate a short, simple, and realistic dialogue script for a language learner based on the following scenario: {{{scenario}}}.

The conversation should be primarily in {{{targetLanguage}}}.
The script must have exactly two speakers: "User" (the language learner) and one other character (e.g., "Barista", "Clerk", "Friend").
The script should be between 4 and 6 lines long in total.
Keep the language natural and easy to understand for a learner.

Scenario: "{{{scenario}}}"

Generate the script now.`,
});


const rolePlayingFlow = ai.defineFlow(
  {
    name: 'rolePlayingFlow',
    inputSchema: RoleplaySceneInputSchema,
    outputSchema: RoleplaySceneOutputSchema,
  },
  async (input) => {
    // 1. Generate the script
    const { output: scriptOutput } = await scriptPrompt(input, { model: googleAI.model('gemini-1.5-flash') });
    
    if (!scriptOutput?.script || scriptOutput.script.length === 0) {
      throw new Error('Failed to generate a script for the scenario.');
    }
    const { script } = scriptOutput;

    // 2. Format the script for multi-speaker TTS
    const ttsPrompt = script.map((line) => `${line.speaker}: ${line.line}`).join('\n');
    const otherSpeakerName = script.find((line) => line.speaker !== 'User')?.speaker || 'Speaker2';

    // 3. Generate the multi-speaker audio
    const { media } = await ai.generate({
      model: googleAI.model('gemini-2.5-flash-preview-tts'),
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
            multiSpeakerVoiceConfig: {
                speakerVoiceConfigs: [
                    {
                        speaker: 'User',
                        voiceConfig: { prebuiltVoiceConfig: { voiceName: input.targetLanguage === 'Persian' ? 'Achernar' : 'Algenib' } }
                    },
                    {
                        speaker: otherSpeakerName,
                        voiceConfig: { prebuiltVoiceConfig: { voiceName: input.targetLanguage === 'Persian' ? 'Cursa' : 'Caelum' } }
                    }
                ]
            }
        }
      },
      prompt: ttsPrompt,
    });
    
    if (!media) {
      throw new Error('Failed to generate audio.');
    }
    
    const audioBuffer = Buffer.from(media.url.substring(media.url.indexOf(',') + 1), 'base64');
    
    // 4. Convert PCM audio to WAV
    const audioDataUri = 'data:audio/wav;base64,' + (await toWav(audioBuffer));

    // 5. Return the final output
    return {
      script,
      audioDataUri,
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

export async function generateRoleplayScene(
  input: RoleplaySceneInput
): Promise<RoleplaySceneOutput> {
  return rolePlayingFlow(input);
}
