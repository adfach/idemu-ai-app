'use server';

/**
 * @fileOverview A flow for suggesting improvements to a given prompt.
 *
 * - suggestPromptImprovements - A function that takes a prompt as input and returns suggestions for improvement.
 * - SuggestPromptImprovementsInput - The input type for the suggestPromptImprovements function.
 * - SuggestPromptImprovementsOutput - The return type for the suggestPromptImprovements function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestPromptImprovementsInputSchema = z.object({
  prompt: z.string().describe('The prompt to improve.'),
});
export type SuggestPromptImprovementsInput = z.infer<typeof SuggestPromptImprovementsInputSchema>;

const SuggestPromptImprovementsOutputSchema = z.object({
  suggestions: z.array(z.string()).describe('An array of suggestions for improving the prompt.'),
});
export type SuggestPromptImprovementsOutput = z.infer<typeof SuggestPromptImprovementsOutputSchema>;

export async function suggestPromptImprovements(
  input: SuggestPromptImprovementsInput
): Promise<SuggestPromptImprovementsOutput> {
  return suggestPromptImprovementsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestPromptImprovementsPrompt',
  input: {schema: SuggestPromptImprovementsInputSchema},
  output: {schema: SuggestPromptImprovementsOutputSchema},
  prompt: `You are an AI prompt improvement expert. Given a prompt, you will provide a list of suggestions for improving it.\n\nPrompt: {{{prompt}}}`,
});

const suggestPromptImprovementsFlow = ai.defineFlow(
  {
    name: 'suggestPromptImprovementsFlow',
    inputSchema: SuggestPromptImprovementsInputSchema,
    outputSchema: SuggestPromptImprovementsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
