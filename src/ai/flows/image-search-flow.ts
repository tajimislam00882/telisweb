'use server';
/**
 * @fileOverview An AI flow for performing searches based on image content.
 *
 * - imageSearch - A function that takes an image and returns a search query.
 * - ImageSearchInput - The input type for the imageSearch function.
 * - ImageSearchOutput - The return type for the imageSearch function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const ImageSearchInputSchema = z.object({
  imageDataUri: z
    .string()
    .describe(
      "An image of a product or a concept, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ImageSearchInput = z.infer<typeof ImageSearchInputSchema>;

const ImageSearchOutputSchema = z.object({
  searchQuery: z.string().describe('A concise, effective search query based on the image content.'),
});
export type ImageSearchOutput = z.infer<typeof ImageSearchOutputSchema>;


export async function imageSearch(input: ImageSearchInput): Promise<ImageSearchOutput> {
  return imageSearchFlow(input);
}


const prompt = ai.definePrompt({
    name: 'imageSearchPrompt',
    input: { schema: ImageSearchInputSchema },
    output: { schema: ImageSearchOutputSchema },
    prompt: `Analyze the following image. Based on its content, colors, and style, generate a concise and effective search query (3-5 words) that could be used to find similar items in a digital product marketplace.

Focus on the most prominent features. For example, if the image is a logo with a minimalist mountain design, a good query would be "minimalist mountain logo design". If it's a vibrant, abstract UI design, "vibrant abstract UI kit" would be appropriate.

Image: {{media url=imageDataUri}}`,
});


const imageSearchFlow = ai.defineFlow(
  {
    name: 'imageSearchFlow',
    inputSchema: ImageSearchInputSchema,
    outputSchema: ImageSearchOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('Failed to generate a search query from the image.');
    }
    return output;
  }
);
