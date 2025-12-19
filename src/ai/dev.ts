'use server';
import { config } from 'dotenv';
config();

import '@/ai/flows/bilingual-short-story-generation.ts';
import '@/ai/flows/weekly-translation-exercise-generation.ts';
import '@/ai/flows/ai-powered-accent-training.ts';
import '@/ai/flows/weekly-listening-comprehension-article-selection.ts';
import '@/ai/flows/personalized-lesson-generation.ts';
import '@/ai/flows/daily-language-challenge-generation.ts';
import '@/ai/flows/karaoke-song-generator.ts';
import '@/ai/flows/object-identification.ts';
import '@/ai/flows/chatbot-flow.ts';
import '@/ai/flows/role-playing-flow.ts';
import '@/ai/flows/simultaneous-interpretation-flow.ts';
import '@/ai/flows/app-creation-story-audiobook.ts';
import '@/ai/flows/general-knowledge-challenge-generation.ts';
