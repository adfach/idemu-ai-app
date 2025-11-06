import { config } from 'dotenv';
config();

import '@/ai/flows/generate-prompt-ideas.ts';
import '@/ai/flows/suggest-prompt-improvements.ts';
import '@/ai/flows/optimize-prompt-with-gemini.ts';