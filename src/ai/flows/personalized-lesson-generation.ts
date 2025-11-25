'use server';

/**
 * @fileOverview Personalized lesson generation flow.
 *
 * This flow analyzes a user's language proficiency through an interview and generates
 * personalized lessons and exercises tailored to their needs and learning style.
 *
 * @interface PersonalizedLessonInput - Input for the personalized lesson generation flow.
 * @interface PersonalizedLessonOutput - Output of the personalized lesson generation flow.
 * @function generatePersonalizedLesson - The main function to trigger the flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define the input schema for the personalized lesson generation.
const PersonalizedLessonInputSchema = z.object({
  userLanguage: z.string().describe('The language the user is learning.'),
  nativeLanguage: z.string().describe('The user\'s native language.'),
  lessonRequirements: z
    .string()
    .describe(
      'A description of the lesson requirements, including topic, goals, and target audience.'
    ),
});
export type PersonalizedLessonInput = z.infer<typeof PersonalizedLessonInputSchema>;

// Define the output schema for the personalized lesson generation.
const PersonalizedLessonOutputSchema = z.object({
  lessonTitle: z.string().describe('The title of the generated lesson.'),
  lessonContent: z
    .string()
    .describe('The content of the generated lesson, including explanations and examples.'),
  exercises: z.array(
    z.object({
      exerciseType: z.string().describe('The type of exercise (e.g., grammar, vocabulary, pronunciation).'),
      exerciseDescription: z.string().describe('A description of the exercise.'),
    })
  ).
    describe('List of exercises.'),
});
export type PersonalizedLessonOutput = z.infer<typeof PersonalizedLessonOutputSchema>;

// Main function to trigger the personalized lesson generation flow.
export async function generatePersonalizedLesson(
  input: PersonalizedLessonInput
): Promise<PersonalizedLessonOutput> {
  return personalizedLessonFlow(input);
}

// Define the prompt for the personalized lesson generation.
const personalizedLessonPrompt = ai.definePrompt({
  name: 'personalizedLessonPrompt',
  input: {schema: PersonalizedLessonInputSchema},
  output: {schema: PersonalizedLessonOutputSchema},
  prompt: `You are an AI language tutor specializing in creating personalized lessons for content creators.

  Based on the user's requirements, create a single tailored lesson with exercises. This lesson plan will be used by an advanced user to teach others. The target language for the lesson is: {{{userLanguage}}}. The creator's native language is: {{{nativeLanguage}}}.

  Lesson Requirements:
  {{lessonRequirements}}

  Create a lesson that is engaging, effective, and structured. The output should be a complete lesson plan that an instructor can use to teach others. Structure it with clear sections (e.g., Introduction, Grammar Point, Vocabulary, Practice). For each section, provide content and then create a relevant exercise to reinforce the concept.
  `,  
});

// Define the personalized lesson generation flow.
const personalizedLessonFlow = ai.defineFlow(
  {
    name: 'personalizedLessonFlow',
    inputSchema: PersonalizedLessonInputSchema,
    outputSchema: PersonalizedLessonOutputSchema,
  },
  async input => {
    const {output} = await personalizedLessonPrompt(input);
    return output!;
  }
);
