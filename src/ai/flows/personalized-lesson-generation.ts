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
  interviewTranscript: z
    .string()
    .describe(
      'A transcript of the interview with the user, detailing their current language proficiency, learning goals, and preferences.'
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
  prompt: `You are an AI language tutor specializing in creating personalized lessons.

  Based on the user's interview transcript, create a single tailored lesson with exercises that addresses their specific language learning needs. The target language the user is learning is: {{{userLanguage}}}. The user's native language is: {{{nativeLanguage}}}.

  Interview Transcript:
  {{interviewTranscript}}

  Create a lesson that is engaging, effective, and aligned with the user's learning style and goals.  The output should be structured to teach the user in small increments, with each section followed by an exercise to reinforce the concept taught.  Ensure that the exercise type matches the section of the lesson.
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
