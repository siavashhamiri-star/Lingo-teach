
import { configureGenkit, ai } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

configureGenkit({
  plugins: [googleAI({
    apiVersion: "v1beta"
  })],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});

export { ai };
