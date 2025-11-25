'use server';

/**
 * @fileOverview A Genkit flow for generating a karaoke track with translated lyrics.
 *
 * - generateKaraokeTrack - A function that finds song lyrics and translates them.
 * - KaraokeTrackInput - The input type for the generateKaraokeTrack function.
 * - KaraokeTrackOutput - The return type for the generateKaraokeTrack function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const KaraokeTrackInputSchema = z.object({
  songTitle: z.string().describe('The title of the song.'),
  artist: z.string().describe('The artist of the song.'),
  targetLanguage: z.enum(['en', 'fa']).describe('The language to translate the lyrics into.'),
});
export type KaraokeTrackInput = z.infer<typeof KaraokeTrackInputSchema>;

const KaraokeTrackOutputSchema = z.object({
  songTitle: z.string().describe('The title of the song.'),
  artist: z.string().describe('The artist of the song.'),
  originalLyrics: z.string().describe('The original lyrics of the song.'),
  translatedLyrics: z.string().describe('The translated lyrics of the song.'),
});
export type KaraokeTrackOutput = z.infer<typeof KaraokeTrackOutputSchema>;

export async function generateKaraokeTrack(
  input: KaraokeTrackInput
): Promise<KaraokeTrackOutput> {
  return karaokeTrackFlow(input);
}

// A placeholder tool to simulate finding lyrics. In a real app, this would use an external API.
const getLyricsTool = ai.defineTool(
  {
    name: 'getLyrics',
    description: 'Gets the lyrics for a given song title and artist.',
    inputSchema: z.object({
      songTitle: z.string(),
      artist: z.string(),
    }),
    outputSchema: z.string(),
  },
  async ({ songTitle, artist }) => {
    // This is a placeholder. A real implementation would call a lyrics API.
    // To make the demo work, we'll return a known song's lyrics.
    if (songTitle.toLowerCase() === 'bohemian rhapsody' && artist.toLowerCase() === 'queen') {
        return `Is this the real life? Is this just fantasy?
Caught in a landslide, no escape from reality
Open your eyes, look up to the skies and see
I'm just a poor boy, I need no sympathy
Because I'm easy come, easy go, little high, little low
Any way the wind blows doesn't really matter to me, to me`;
    }
    // You can add more placeholder songs here for testing.
    throw new Error(`Lyrics for "${songTitle}" by ${artist} not found. Please try another song.`);
  }
);


const translationPrompt = ai.definePrompt({
  name: 'karaokeTranslationPrompt',
  input: {
    schema: z.object({
      lyrics: z.string(),
      targetLanguage: z.string(),
    }),
  },
  output: {
    schema: z.object({
      translatedLyrics: z.string(),
    }),
  },
  prompt: `You are a professional translator specializing in song lyrics. Translate the following lyrics into {{targetLanguage}}. Maintain the poetic and emotional tone of the original lyrics as much as possible.

Original Lyrics:
{{{lyrics}}}

Translated Lyrics:`,
});


const karaokeTrackFlow = ai.defineFlow(
  {
    name: 'karaokeTrackFlow',
    inputSchema: KaraokeTrackInputSchema,
    outputSchema: KaraokeTrackOutputSchema,
    tools: [getLyricsTool],
  },
  async (input) => {
    // Step 1: Get the lyrics using the tool.
    const lyrics = await getLyricsTool(input);

    if (!lyrics) {
      throw new Error('Could not retrieve lyrics for the song.');
    }
    
    // Step 2: Translate the lyrics using the prompt.
    const translationResult = await translationPrompt({
        lyrics: lyrics,
        targetLanguage: input.targetLanguage === 'fa' ? 'Persian' : 'English',
    });

    if(!translationResult.output) {
        throw new Error('Could not translate lyrics.');
    }

    return {
      songTitle: input.songTitle,
      artist: input.artist,
      originalLyrics: lyrics,
      translatedLyrics: translationResult.output.translatedLyrics,
    };
  }
);
