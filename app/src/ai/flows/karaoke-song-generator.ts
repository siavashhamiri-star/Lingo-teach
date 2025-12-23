'use server';

/**
 * @fileOverview A Genkit flow for generating a karaoke track with translated lyrics.
 *
 * - generateKaraokeTrack - A function that finds song lyrics and translates them.
 * - KaraokeTrackInput - The input type for the generateKaraokeTrack function.
 * - KaraokeTrackOutput - The return type for the generateKaraokeTrack function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { googleAI } from '@genkit-ai/google-genai';

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

const karaokeTrackFlow = ai.defineFlow(
  {
    name: 'karaokeTrackFlow',
    inputSchema: KaraokeTrackInputSchema,
    outputSchema: KaraokeTrackOutputSchema,
  },
  async (input) => {
    const model = googleAI.model('gemini-1.5-flash');
    // Step 1: Get the lyrics.
    const lyricsResponse = await ai.generate({
        model,
        prompt: `You are a lyrics finder. Find the lyrics for the song "${input.songTitle}" by ${input.artist}.
      If you can't find them, say you couldn't. For demonstration, if the song is "Bohemian Rhapsody" by "Queen", return the first verse.
      Return only the lyrics, nothing else.
      `,
    });

    const lyricsText = lyricsResponse.text;

    if (!lyricsText) {
      throw new Error('Could not retrieve lyrics for the song.');
    }
    
    // Step 2: Translate the lyrics using the prompt.
    const translationResponse = await ai.generate({
        model,
        prompt: `You are a professional translator specializing in song lyrics. Translate the following lyrics into ${input.targetLanguage === 'fa' ? 'Persian' : 'English'}. Maintain the poetic and emotional tone of the original lyrics as much as possible.

Original Lyrics:
${lyricsText}

Translated Lyrics:`,
    });
    
    const translationText = translationResponse.text;

    if (!translationText) {
      throw new Error('Could not translate lyrics.');
    }

    return {
      songTitle: input.songTitle,
      artist: input.artist,
      originalLyrics: lyricsText,
      translatedLyrics: translationText,
    };
  }
);


export async function generateKaraokeTrack(
  input: KaraokeTrackInput
): Promise<KaraokeTrackOutput> {
  return karaokeTrackFlow(input);
}
