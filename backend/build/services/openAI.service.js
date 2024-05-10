"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchQuestionsFromOpenAI = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
require("dotenv").config();
const openai_1 = __importDefault(require("openai"));
const server_1 = require("../server");
const question_service_1 = __importDefault(require("../api/question/question.service"));
const openai = new openai_1.default();
async function fetchQuestionsFromOpenAI({ prompt, numberOfQuestions = 1, language, level, }) {
    const res = await queryOpenAI({ prompt, numberOfQuestions, language, level });
    if (!res)
        return [];
    const parsedQuestions = parseQuestionsFromRes(res);
    if (!parsedQuestions)
        return [];
    const formmattedQuestions = formatQuestions({
        questionsFromRes: parsedQuestions,
        language,
        level,
    });
    const savedQuestions = await saveQuestionsToDB(formmattedQuestions);
    return savedQuestions;
}
exports.fetchQuestionsFromOpenAI = fetchQuestionsFromOpenAI;
async function queryOpenAI({ prompt, numberOfQuestions = 1, language, level, }) {
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
async function getPrevQuestionStr({ language }) {
    const session = server_1.ravenStore.openSession();
    const query = session.query({ collection: "Questions" });
    query.whereEquals("language", language);
    const questionsDocs = await query.all();
    const questionStrs = questionsDocs.map(q => q.question);
    return questionStrs;
}
function parseQuestionsFromRes(res) {
    const isResString = typeof res === "string";
    if (!isResString)
        return [];
    const parsedRes = JSON.parse(res);
    let questionsFromRes;
    if (parsedRes.questions && Array.isArray(parsedRes.questions))
        questionsFromRes = parsedRes.questions;
    else if (typeof parsedRes === "object")
        questionsFromRes = [parsedRes];
    else
        return [];
    return questionsFromRes;
}
function formatQuestions({ questionsFromRes, language, level, }) {
    const formmattedQuestions = questionsFromRes.map((q) => {
        return {
            question: q.question,
            options: q.options,
            correctOption: q.correctOption,
            language,
            level,
            points: question_service_1.default.levelPointsMap.get(level),
            isArchived: false,
            isMarkedToBeRevised: false,
            isRevised: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
    });
    return formmattedQuestions;
}
async function saveQuestionsToDB(questions) {
    const savedQuestions = [];
    for (const q of questions) {
        const savedQuestion = await question_service_1.default.add(q);
        savedQuestions.push(savedQuestion);
    }
    return savedQuestions;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3BlbkFJLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VydmljZXMvb3BlbkFJLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsdURBQXVEO0FBQ3ZELE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUMzQixvREFBNEI7QUFDNUIsc0NBQXVDO0FBRXZDLHdGQUErRDtBQUcvRCxNQUFNLE1BQU0sR0FBRyxJQUFJLGdCQUFNLEVBQUUsQ0FBQztBQUU1QixLQUFLLFVBQVUsd0JBQXdCLENBQUMsRUFDdEMsTUFBTSxFQUNOLGlCQUFpQixHQUFHLENBQUMsRUFDckIsUUFBUSxFQUNSLEtBQUssR0FDbUI7SUFDeEIsTUFBTSxHQUFHLEdBQUcsTUFBTSxXQUFXLENBQUMsRUFBRSxNQUFNLEVBQUUsaUJBQWlCLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7SUFFOUUsSUFBSSxDQUFDLEdBQUc7UUFBRSxPQUFPLEVBQUUsQ0FBQztJQUNwQixNQUFNLGVBQWUsR0FBRyxxQkFBcUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNuRCxJQUFJLENBQUMsZUFBZTtRQUFFLE9BQU8sRUFBRSxDQUFDO0lBQ2hDLE1BQU0sbUJBQW1CLEdBQUcsZUFBZSxDQUFDO1FBQzFDLGdCQUFnQixFQUFFLGVBQWU7UUFDakMsUUFBUTtRQUNSLEtBQUs7S0FDTixDQUFDLENBQUM7SUFDSCxNQUFNLGNBQWMsR0FBZSxNQUFNLGlCQUFpQixDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFFaEYsT0FBTyxjQUFjLENBQUM7QUFDeEIsQ0FBQztBQW9HUSw0REFBd0I7QUFsR2pDLEtBQUssVUFBVSxXQUFXLENBQUMsRUFDekIsTUFBTSxFQUNOLGlCQUFpQixHQUFHLENBQUMsRUFDckIsUUFBUSxFQUNSLEtBQUssR0FDbUI7SUFDeEIsTUFBTSxNQUFNLEdBQUc7Ozs7UUFJVCxDQUFDO0lB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