import {
  ProgrammingLanguage,
  DifficultyLevels,
  systemSettings,
  LanguageInfo,
} from "../../../../shared/types/system";
import { changeThemeColors } from "../../services/utils.service";
import { AppStatus } from "../types";

type SystemState = {
  status: AppStatus;
  language: ProgrammingLanguage;
  secondsPerQuestion: number;
  page: number;
  level: DifficultyLevels;
  systemSettings: systemSettings;
};

const initialState: SystemState = {
  status: "loading",
  language: "HTML",
  secondsPerQuestion: 30,
  level: "beginner",
  page: 1,
  systemSettings: {
    programmingLanguages: {} as Record<ProgrammingLanguage, LanguageInfo>,
    difficultyLevels: [],
  },
};

export function systemReducer(
  state = initialState,
  action: {
    type: string;
    status: AppStatus;
    language: ProgrammingLanguage;
    secondsPerQuestion: number;
    level: DifficultyLevels;
    page: number;
    systemSettings: systemSettings;
  }
): SystemState {
  switch (action.type) {
    case "SET_SYSTEM_SETTINGS":
      return {
        ...state,
        systemSettings: action.systemSettings,
      };
    case "SET_STATUS":
      return {
        ...state,
        status: action.status,
      };
    case "SET_LANGUAGE": {
      const { themeColors } = state.systemSettings.programmingLanguages[action.language];
      if (themeColors) changeThemeColors(themeColors);

      return {
        ...state,
        language: action.language,
        page: 1,
        status: "ready",
      };
    }
    case "SET_LEVEL":
      return {
        ...state,
        level: action.level,
        page: 1,
      };
    case "SET_SECONDS_PER_QUESTION":
      return {
        ...state,
        secondsPerQuestion: action.secondsPerQuestion,
      };
    case "INC_OFFSET":
      return {
        ...state,
        page: ++state.page,
      };
    default:
      return state;
  }
}
