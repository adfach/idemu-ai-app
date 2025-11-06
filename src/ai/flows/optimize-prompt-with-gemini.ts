'use server';

/**
 * @fileOverview A flow that uses Gemini AI to optimize a prompt for clarity, effectiveness, and overall quality.
 *
 * - optimizePromptWithGemini - A function that optimizes a prompt using Gemini AI.
 * - OptimizePromptWithGeminiInput - The input type for the optimizePromptWithGemini function.
 * - OptimizePromptWithGeminiOutput - The return type for the optimizePromptWithGemini function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OptimizePromptWithGeminiInputSchema = z.object({
  prompt: z.string().describe('The prompt to be optimized.'),
});
export type OptimizePromptWithGeminiInput = z.infer<typeof OptimizePromptWithGeminiInputSchema>;

const OptimizePromptWithGeminiOutputSchema = z.object({
  optimizedPrompt: z.string().describe('The optimized prompt.'),
});
export type OptimizePromptWithGeminiOutput = z.infer<typeof OptimizePromptWithGeminiOutputSchema>;

export async function optimizePromptWithGemini(input: OptimizePromptWithGeminiInput): Promise<OptimizePromptWithGeminiOutput> {
  return optimizePromptWithGeminiFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimizePromptWithGeminiPrompt',
  input: {schema: OptimizePromptWithGeminiInputSchema},
  output: {schema: OptimizePromptWithGeminiOutputSchema},
  prompt: `You are an AI prompt optimizer. Your goal is to improve the clarity, effectiveness, and overall quality of the given prompt. Optimize the following prompt:\n\n{{prompt}}`,
});

const optimizePromptWithGeminiFlow = ai.defineFlow(
  {
    name: 'optimizePromptWithGeminiFlow',
    inputSchema: OptimizePromptWithGeminiInputSchema,
    outputSchema: OptimizePromptWithGeminiOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
