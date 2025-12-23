import { configureGenkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';
import { genkit } from 'genkit/ai';

export const ai = genkit({
  plugins: [googleAI()],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});
