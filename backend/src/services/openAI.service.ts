/* eslint-disable @typescript-eslint/no-explicit-any */
require("dotenv").config();
import OpenAI from "openai";
import { ravenStore } from "../server";
import { Question } from "../../../shared/types/question";
import questionService from "../api/question/question.service";
import { FetchAPIQuestionsParams } from "../../../shared/types/system";

const openai = new OpenAI();

async function fetchQuestionsFromOpenAI({
  prompt,
  numberOfQuestions = 1,
  language,
  level,
}: FetchAPIQuestionsParams) {
  const res = await queryOpenAI({ prompt, numberOfQuestions, language, level });

  if (!res) return [];
  const parsedQuestions = parseQuestionsFromRes(res);
  if (!parsedQuestions) return [];
  const formmattedQuestions = formatQuestions({
    questionsFromRes: parsedQuestions,
    language,
    level,
  });
  const savedQuestions: Question[] = await saveQuestionsToDB(formmattedQuestions);

  return savedQuestions;
}

async function queryOpenAI({
  prompt,
  numberOfQuestions = 1,
  language,
  level,
}: FetchAPIQuestionsParams) {
  const format = `{
        question: string;
        options: string[];
        correctOption: number;
      }`;
  const prevQuestions = await getPrevQuestionStr({ language });
  const promptWithQuestions = `
      generate ${numberOfQuestions} questions for ${prompt} in ${language}.
      the level of the questions should be ${level} level.
      built in this format: ${format}.
      always output a json array.
      don't repeat the following questions:
      ${prevQuestions}`;

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant designed to output JSON.",
      },
      { role: "user", content: promptWithQuestions },
    ],
    model: "gpt-4-0125-preview",
    response_format: { type: "json_object" },
  });
  const res = completion.choices[0].message.content;
  return res;
}

async function getPrevQuestionStr({ language }: { language: string }) {
  const session = ravenStore.openSession();
  const query = session.query<Question>({ collection: "Questions" });
  query.whereEquals("language", language);
  const questionsDocs = await query.all();
  const questionStrs = questionsDocs.map(q => q.question);
  return questionStrs;
}

function parseQuestionsFromRes(res: string) {
  const isResString = typeof res === "string";
  if (!isResString) return [];
  const parsedRes = JSON.parse(res) as any;

  let questionsFromRes;

  if (parsedRes.questions && Array.isArray(parsedRes.questions))
    questionsFromRes = parsedRes.questions;
  else if (typeof parsedRes === "object") questionsFromRes = [parsedRes];
  else return [];

  return questionsFromRes;
}

function formatQuestions({
  questionsFromRes,
  language,
  level,
}: {
  questionsFromRes: any[];
  language: string;
  level: string;
}): Question[] {
  const formmattedQuestions = questionsFromRes.map((q: any) => {
    return {
      question: q.question,
      options: q.options,
      correctOption: q.correctOption,
      language,
      level,
      points: questionService.levelPointsMap.get(level),
      isArchived: false,
      isMarkedToBeRevised: false,
      isRevised: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }) as Question[];

  return formmattedQuestions;
}

async function saveQuestionsToDB(questions: Question[]) {
  const savedQuestions: Question[] = [];

  for (const q of questions) {
    const savedQuestion = await questionService.add(q);
    savedQuestions.push(savedQuestion);
  }

  return savedQuestions;
}

export { fetchQuestionsFromOpenAI };
