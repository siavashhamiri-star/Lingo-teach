'use server';

import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';
import { next } from '@genkit-ai/next';

export const ai = genkit({
  plugins: [googleAI(), next()],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});
