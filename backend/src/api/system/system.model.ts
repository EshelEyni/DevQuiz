/* eslint-disable no-unused-vars */
import { Schema, model } from "mongoose";
import { difficultyLevels, programmingLanguages } from "./system.service";

const LanguageInfoSchema = new Schema({
  name: {
    type: String,
    required: true,
    enum: [...programmingLanguages],
  },
  img: { type: String, required: true },
  themeColors: {
    themeColor: { type: String, required: true },
    accentColor: { type: String, required: true },
  },
});

const systemSettingSchema = new Schema(
  {
    programmingLanguages: {
      type: Map,
      of: LanguageInfoSchema,
    },
    difficultyLevels: {
      type: [String],
      enum: [...difficultyLevels],
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
