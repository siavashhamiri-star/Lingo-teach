
'use server';

/**
 * @fileOverview A Genkit flow for generating a short, cinematic movie based on user input.
 *
 * - generateGenesisMovie - Creates a short video using a text prompt.
 * - GenesisMovieInput - The input type for the flow.
 * - GenesisMovieOutput - The return type for the flow.
 */

import { z } from 'zod';
import { ai } from '../genkit';
import { googleAI } from '@genkit-ai/google-genai';

const GenesisMovieInputSchema = z.object({
  userQuote: z.string().describe('A meaningful sentence or idea provided by the user to inspire the video generation.'),
});
export type GenesisMovieInput = z.infer<typeof GenesisMovieInputSchema>;

const GenesisMovieOutputSchema = z.object({
  videoDataUri: z.string().describe('A data URI for the generated MP4 video file.'),
});
export type GenesisMovieOutput = z.infer<typeof GenesisMovieOutputSchema>;


const getVideoAsDataUriFlow = ai.defineFlow(
  {
    name: 'getVideoAsDataUriFlow',
    inputSchema: z.any(),
    outputSchema: z.string(),
  },
  async (video) => {
    const fetch = (await import('node-fetch')).default;
    // The URL from the operation result needs the API key to be accessible.
    const videoDownloadResponse = await fetch(
      `${video.media!.url}&key=${process.env.GEMINI_API_KEY}`
    );

    if (!videoDownloadResponse.ok || !videoDownloadResponse.body) {
      throw new Error(`Failed to download video: ${videoDownloadResponse.statusText}`);
    }

    const videoBuffer = await videoDownloadResponse.arrayBuffer();
    const base64Video = Buffer.from(videoBuffer).toString('base64');
    const contentType = video.media?.contentType || 'video/mp4';

    return `data:${contentType};base64,${base64Video}`;
  }
);


const genesisMovieFlow = ai.defineFlow(
  {
    name: 'genesisMovieFlow',
    inputSchema: GenesisMovieInputSchema,
    outputSchema: GenesisMovieOutputSchema,
  },
  async ({ userQuote }) => {
    
    const prompt = `A cinematic, epic, hopeful shot of a futuristic city of knowledge being built from rays of light. Show diverse people collaborating and looking up with wonder. The architecture is flowing and organic. The feeling is one of creation and empowerment.
    Now, visually interpret this core idea provided by the user: "${userQuote}"`;

    let { operation } = await ai.generate({
      model: googleAI.model('veo-2.0-generate-001'),
      prompt: prompt,
      config: {
        durationSeconds: 8,
        aspectRatio: '16:9',
      },
    });

    if (!operation) {
        throw new Error('Expected the model to return an operation');
    }

    // Video generation can take a while. We need to poll the operation status.
    while (!operation.done) {
      // Wait for 5 seconds before checking the status again.
      await new Promise(resolve => setTimeout(resolve, 5000));
      operation = await ai.checkOperation(operation);
    }

    if (operation.error) {
      throw new Error(`Failed to generate video: ${operation.error.message}`);
    }
    
    const video = operation.output?.message?.content.find((p) => !!p.media);
    if (!video) {
      throw new Error('Failed to find the generated video in the operation result.');
    }

    // Download the video and convert it to a data URI to send to the client.
    const videoDataUri = await getVideoAsDataUriFlow(video);

    return {
      videoDataUri: videoDataUri,
    };
  }
);

// This is a long-running operation, so we need to define it as a flow.
export async function generateGenesisMovie(input: GenesisMovieInput): Promise<GenesisMovieOutput> {
  return genesisMovieFlow(input);
}
