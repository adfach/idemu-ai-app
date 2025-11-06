'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating prompt ideas based on a given topic.
 *
 * It exports:
 * - `generatePromptIdeas`: An async function that takes a topic as input and returns a list of prompt ideas.
 * - `GeneratePromptIdeasInput`: The input type for the `generatePromptIdeas` function.
 * - `GeneratePromptIdeasOutput`: The output type for the `generatePromptIdeas` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePromptIdeasInputSchema = z.object({
  topic: z.string().describe('The general topic for which to generate prompt ideas.'),
});
export type GeneratePromptIdeasInput = z.infer<typeof GeneratePromptIdeasInputSchema>;

const GeneratePromptIdeasOutputSchema = z.object({
  ideas: z.array(z.string()).describe('A list of prompt ideas related to the given topic.'),
});
export type GeneratePromptIdeasOutput = z.infer<typeof GeneratePromptIdeasOutputSchema>;

export async function generatePromptIdeas(input: GeneratePromptIdeasInput): Promise<GeneratePromptIdeasOutput> {
  return generatePromptIdeasFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePromptIdeasPrompt',
  input: {schema: GeneratePromptIdeasInputSchema},
  output: {schema: GeneratePromptIdeasOutputSchema},
  prompt: `You are an AI prompt idea generator. Generate 5 prompt ideas based on the following topic:\n\nTopic: {{{topic}}}\n\nFormat your response as a JSON array of strings.`,
});

const generatePromptIdeasFlow = ai.defineFlow(
  {
    name: 'generatePromptIdeasFlow',
    inputSchema: GeneratePromptIdeasInputSchema,
    outputSchema: GeneratePromptIdeasOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
