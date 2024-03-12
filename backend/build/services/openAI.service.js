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
      generate ${numberOfQuestions} questions for ${prompt}.
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