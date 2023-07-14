/* eslint-disable no-unused-vars */
import { Schema, model } from "mongoose";

export enum ProgrammingLanguage {
  HTML = "HTML",
  CSS = "CSS",
  JavaScript = "JavaScript",
  TypeScript = "TypeScript",
  Angular = "Angular",
  React = "React",
  Vue = "Vue",
  NodeJs = "NodeJs",
  SQL = "SQL",
  MongoDB = "MongoDB",
}

const systemSettingSchema = new Schema(
  {
    programmingLanguages: {
      type: [String],
      required: true,
      validate: {
        validator: (v: string[]) => {
          return v.every((lang: string) => {
            return Object.values(ProgrammingLanguage)
              .map(value => value.toLowerCase())
              .includes(lang.toLowerCase() as ProgrammingLanguage);
          });
        },
        message: (props: any) => `${props.value} is not a valid programming language`,
      },
    },
    themeColors: {
      type: Map,
      of: {
        type: Map,
        of: String,
      },
      required: true,
    },
    difficultyLevels: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc: Document, ret: Record<string, unknown>) => {
        delete ret._id;
        return ret;
      },
    },
    toObject: {
      virtuals: true,
      transform: (doc: Document, ret: Record<string, unknown>) => {
        delete ret._id;
        return ret;
      },
    },
  }
);

const SystemSettingModel = model("system_setting", systemSettingSchema);

export { SystemSettingModel };
