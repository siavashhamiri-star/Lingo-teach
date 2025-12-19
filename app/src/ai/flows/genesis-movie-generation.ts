'use server';

/**
 * @fileOverview A Genkit flow for generating a short, cinematic movie about the creation of Afarinesh.
 *
 * - generateGenesisMovie - Creates a short video using a text prompt.
 * - GenesisMovieOutput - The return type for the flow.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';
import type { MediaPart } from 'genkit';

const GenesisMovieOutputSchema = z.object({
  videoDataUri: z.string().describe('A data URI for the generated MP4 video file.'),
});
export type GenesisMovieOutput = z.infer<typeof GenesisMovieOutputSchema>;

// This is a long-running operation, so we need to define it as a flow.
export async function generateGenesisMovie(): Promise<GenesisMovieOutput> {
  return genesisMovieFlow();
}

// Helper function to handle video download and encoding
async function getVideoAsDataUri(video: MediaPart): Promise<string> {
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


const genesisMovieFlow = ai.defineFlow(
  {
    name: 'genesisMovieFlow',
    outputSchema: GenesisMovieOutputSchema,
  },
  async () => {
    let { operation } = await ai.generate({
      model: googleAI.model('veo-2.0-generate-001'),
      prompt: 'A cinematic, epic, hopeful shot of a futuristic city of knowledge being built from rays of light. Show diverse people collaborating and looking up with wonder. The architecture is flowing and organic. The feeling is one of creation and empowerment.',
      config: {
        durationSeconds: 8,
        aspectRatio: '16:9',
      },
    });

    if (!operation) {
      throw new Error('Expected the model to return an operation for video generation.');
    }

    // Video generation can take a while. We need to poll the operation status.
    while (!operation.done) {
      // Wait for 5 seconds before checking the status again.
      await new Promise((resolve) => setTimeout(resolve, 5000));
      operation = await ai.checkOperation(operation);
    }

    if (operation.error) {
      throw new Error(`Failed to generate video: ${operation.error.message}`);
    }

    // Find the video in the output content.
    const video = operation.output?.message?.content.find((p) => !!p.media);
    if (!video) {
      throw new Error('Failed to find the generated video in the operation result.');
    }
    
    // Download the video and convert it to a data URI to send to the client.
    const videoDataUri = await getVideoAsDataUri(video);

    return {
      videoDataUri,
    };
  }
);
