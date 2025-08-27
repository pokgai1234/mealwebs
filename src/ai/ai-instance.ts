import * as dotenv from "dotenv";
dotenv.config();

import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

const apiKey = process.env.GOOGLE_GENAI_API_KEY || "";

export const ai = genkit({
  promptDir: './prompts',
  plugins: [
    googleAI({ apiKey }),
    }),
  ],
  model: 'googleai/gemini-2.0-flash',
});
