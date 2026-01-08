
import { GoogleGenAI, Type } from "@google/genai";
import { QuizData } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const generateQuiz = async (grade: number): Promise<QuizData> => {
  const prompt = `
    Ты — Человек-паук, дружелюбный сосед и супергерой, который помогает детям изучать русский язык.
    Создай тест по правилам русского языка для ученика ${grade} класса российской школы.
    
    Требования:
    1. Весь текст должен быть на русском языке.
    2. Выбери одно конкретное правило из школьной программы за ${grade} класс (например: безударные гласные, приставки, знаки препинания в сложном предложении и т.д.).
    3. Создай 5 вопросов с вариантами ответов (3-4 варианта).
    4. Темы вопросов должны быть интересны ребенку: используй персонажей мультфильмов (Смешарики, Фиксики), компьютерных игр (Minecraft, Roblox, Brawl Stars), супергероев или популярных блогеров.
    5. После вопросов добавь понятное и краткое объяснение выбранного правила.
    6. Твой стиль общения должен быть поддерживающим, в стиле Человека-паука (используй фразы типа "Великая сила — это великие знания!", "Паучье чутье подсказывает...").
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          ruleName: { type: Type.STRING, description: "Название правила" },
          ruleExplanation: { type: Type.STRING, description: "Объяснение правила" },
          questions: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                question: { type: Type.STRING },
                options: { 
                  type: Type.ARRAY, 
                  items: { type: Type.STRING } 
                },
                correctIndex: { type: Type.INTEGER }
              },
              required: ["question", "options", "correctIndex"]
            }
          }
        },
        required: ["ruleName", "ruleExplanation", "questions"]
      }
    }
  });

  return JSON.parse(response.text) as QuizData;
};
