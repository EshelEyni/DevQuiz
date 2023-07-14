import {
  ProgrammingLanguage,
  ThemeColors,
  difficultyLevels,
  systemSettings,
} from "../../../../shared/types/system";
import { changeThemeColors } from "../../services/utils.service";
import { AppStatus } from "../types";

type SystemState = {
  status: AppStatus;
  language: ProgrammingLanguage;
  secondsPerQuestion: number;
  offSet: number;
  level: difficultyLevels;
  systemSettings: systemSettings;
  isContactModalOpen: boolean;
  isReportQuestionModalOpen: boolean;
};

const initialState: SystemState = {
  status: "loading",
  language: "HTML",
  secondsPerQuestion: 30,
  level: "beginner",
  offSet: 1,
  systemSettings: {
    programmingLanguages: [],
    difficultyLevels: [],
    themeColors: {},
  },
  isContactModalOpen: false,
  isReportQuestionModalOpen: false,
};

export function systemReducer(
  state = initialState,
  action: {
    type: string;
    status: AppStatus;
    language: ProgrammingLanguage;
    secondsPerQuestion: number;
    level: difficultyLevels;
    offSet: number;
    systemSettings: {
      programmingLanguages: ProgrammingLanguage[];
      difficultyLevels: difficultyLevels[];
      themeColors: ThemeColors;
    };
  }
) {
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
      const themeColors = state.systemSettings.themeColors as ThemeColors;
      if (themeColors[action.language])
        changeThemeColors(
          themeColors[action.language] as { themeColor: string; accentColor: string }
        );
      return {
        ...state,
        language: action.language,
        offSet: 1,
        status: "ready",
      };
    }
    case "SET_LEVEL":
      return {
        ...state,
        level: action.level,
        offSet: 1,
      };
    case "SET_SECONDS_PER_QUESTION":
      return {
        ...state,
        secondsPerQuestion: action.secondsPerQuestion,
      };
    case "INC_OFFSET":
      return {
        ...state,
        offSet: ++state.offSet,
      };
    case "TOGGLE_IS_CONTACT_MODAL_OPEN":
      return {
        ...state,
        isContactModalOpen: !state.isContactModalOpen,
      };
    case "TOGGLE_IS_REPORT_QUESTION_MODAL_OPEN":
      return {
        ...state,
        isReportQuestionModalOpen: !state.isReportQuestionModalOpen,
      };
    default:
      return state;
  }
}
