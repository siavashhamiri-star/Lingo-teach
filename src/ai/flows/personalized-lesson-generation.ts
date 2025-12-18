
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
  userLanguage: z.string().describe("The language the lesson should be taught in (language of instruction)."),
  nativeLanguage: z.string().describe("The student's native language."),
  lessonRequirements: z
    .string()
    .describe(
      'A description of the lesson the user wants to teach. This is the core request.'
    ),
});
export type PersonalizedLessonInput = z.infer<typeof PersonalizedLessonInputSchema>;

// Define the output schema for the personalized lesson generation.
const PersonalizedLessonOutputSchema = z.object({
  lessonTitle: z.string().describe('The title of the generated lesson.'),
  lessonContent: z
    .string()
    .describe('The main content of the lesson, including explanations, examples, and teaching strategies. This should be a complete script that a person can use to teach.'),
  exercises: z.array(
    z.object({
      exerciseType: z.string().describe('The type of exercise (e.g., grammar, vocabulary, pronunciation).'),
      exerciseDescription: z.string().describe('A description of the exercise for the student to complete.'),
    })
  ).
    describe('A list of exercises to reinforce the lesson content.'),
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
  prompt: `You are an AI expert in pedagogy and curriculum design. Your task is to empower a fluent speaker to become an effective teacher.

A user, who is fluent in a language, wants to teach a specific topic to someone else. You will create a complete, structured, and ready-to-use lesson plan based on their request.

**User's Goal:** The user wants to teach a lesson on the following topic:
"{{{lessonRequirements}}}"

**Language of Instruction:** The lesson should be delivered in {{{userLanguage}}}.
**The Student's Native Language is:** {{{nativeLanguage}}}. Keep this in mind for potential difficulties and comparisons.

**Your Task:**
Generate a comprehensive lesson plan that the user can pick up and immediately use to teach. The plan must include:
1.  **A clear, engaging title.**
2.  **The main lesson content:** This should include simple explanations, clear examples, and tips for teaching the concept effectively. It should be written as if the user is reading a script to teach from.
3.  **A set of practical exercises:** Create a few exercises (grammar, vocabulary, role-playing, etc.) that directly relate to the lesson content to help the student practice and reinforce what they've learned.

The output must be a complete lesson plan, ready for the user to teach.
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
