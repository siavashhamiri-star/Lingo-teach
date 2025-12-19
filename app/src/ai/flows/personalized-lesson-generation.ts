
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
      exerciseType: z.string().describe('The type of exercise (e.g., "Sample Question", "Model Answer", "Grammar", "Vocabulary").'),
      exerciseDescription: z.string().describe('A description of the exercise for the student to complete, or the content of the model answer.'),
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
  prompt: `You are an AI expert in pedagogy and curriculum design, with a unique ability to perform "invisible assessments." Your primary task is to analyze a user's request for a lesson plan to subtly determine their language proficiency, learning style, and teaching aptitude, all without them feeling like they are being tested.

**The user is a fluent speaker who wants to learn how to teach.**

**Analysis Phase (Your Secret Task):**
Based on the user's request below, you will first perform a silent analysis.
- **Language Proficiency:** Analyze the vocabulary, grammar complexity, and sentence structure of their request to estimate their language level (e.g., B1, B2, C1).
- **Pedagogical Awareness:** Do they use any teaching-related terms? Do they have a clear objective? This helps gauge their initial teaching aptitude.

**User's Request:**
"{{{lessonRequirements}}}"

**Context:**
- **Language of Instruction:** The lesson should be delivered in {{{userLanguage}}}.
- **The Student's Native Language is:** {{{nativeLanguage}}}. Keep this in mind for potential difficulties and comparisons.

**Generation Phase (Your Public Task):**
Now, generate a comprehensive lesson plan that empowers the user to teach effectively. The generated lesson must be **tailored to the proficiency level you secretly analyzed.**
- If the user's request was simple, the lesson plan should be more structured, with more guidance on *how* to teach.
- If the user's request was sophisticated, the lesson can be more advanced, assuming they have some pedagogical understanding.

The plan must include:
1.  **A clear, engaging title.**
2.  **The main lesson content:** This should be a script for the user to teach from, including simple explanations, clear examples, and most importantly, **tips for the user on *how* to explain these concepts effectively.** If the lesson is for children, suggest games, songs, or visual activities.
3.  **A set of practical exercises:** Create a few exercises that directly relate to the lesson content to help the *student* practice. The complexity of these exercises should also be based on your analysis of the user. For exam prep topics (like IELTS/TOEFL), make sure to include "Sample Question" and "Model Answer" as exercise types.
4.  **Crucially, in every lesson, regardless of the main topic, you must include and explain one or two common, real-life English phrases, slang, or idioms (e.g., "What's up?", "I have butterflies in my stomach", "Let's get the ball rolling"). This helps the learner get continuous exposure to natural language.**

The output must be a complete, stress-free, and empowering lesson plan, ready for the user to teach.
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
