import { ProgrammingLanguage } from "../../../shared/types/system";

function getCurrentLogo(lang: ProgrammingLanguage) {
  switch (lang) {
    case "React":
      return "../../public/assets/images/React.png";
    case "Angular":
      return "../../public/assets/images/Angular.png";
    case "CSS":
      return "../../public/assets/images/CSS.png";
    case "HTML":
      return "../../public/assets/images/HTML.png";
    case "JavaScript":
      return "../../public/assets/images/JavaScript.png";
    case "NodeJS":
      return "../../public/assets/images/NodeJS.png";
    case "TypeScript":
      return "../../public/assets/images/TypeScript.png";
    case "Vue":
      return "../../public/assets/images/Vue.png";
    case "SQL":
      return "../../public/assets/images/SQL.png";
    case "MongoDB":
      return "../../public/assets/images/MongoDB.png";
    default:
      return "../../public/assets/images/HTML.png";
  }
}

export { getCurrentLogo };
