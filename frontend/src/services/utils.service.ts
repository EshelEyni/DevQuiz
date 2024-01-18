import { AnyFunction, JsendResponse } from "../../../shared/types/system";
import { QueryState } from "../types/app.types";

const QUERY_TIMEOUT = 3000;

const defaultQueryState: QueryState = { state: "idle", error: null };

function formatDateToRelativeTime(currDate: Date): string {
  const timestamp = new Date(currDate).getTime();
  const now = Date.now();
  const difference = now - timestamp;
  const seconds = Math.floor(difference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = date.toLocaleString("en", { month: "short" });
  const day = date.getDate();

  if (days > 365) {
    return `${month} ${day}, ${year}`;
  } else if (days > 0) {
    return `${month} ${day}`;
  } else if (hours > 0) {
    return `${hours}h`;
  } else if (minutes > 0) {
    return `${minutes}m`;
  } else {
    if (seconds == 0) return `now`;
    return `${seconds}s`;
  }
}

function formatDateToCleanString(currDate: Date) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const date = new Date(currDate);

  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  const minutesStr = minutes < 10 ? "0" + minutes : minutes;

  const strTime = hours + ":" + minutesStr + " " + ampm;
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  return `${strTime} · ${month} ${day}, ${year}`;
}

function formatNumToK(count: number): string {
  if (count >= 10000) {
    const formattedCount = (count / 1000).toFixed(1);
    return `${formattedCount}k`;
  } else {
    return count.toLocaleString();
  }
}

function makeId(length = 12): string {
  let txt = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return txt;
}

function debounce(
  func: AnyFunction,
  delay: number,
): { debouncedFunc: AnyFunction; cancel: () => void } {
  let timeoutId: ReturnType<typeof setTimeout>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const debouncedFunc = function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
  const cancel = () => {
    clearTimeout(timeoutId);
  };
  return { debouncedFunc, cancel };
}

function getTimeZone(): string {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const timeZoneName = new Intl.DateTimeFormat("en-US", {
    timeZone,
    timeZoneName: "long",
    hour: "numeric",
  })
    .formatToParts()
    .find(part => part.type === "timeZoneName")?.value;

  return timeZoneName ? timeZoneName : "Time Zone Not Found";
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function handleServerResponse<T>(response: JsendResponse): T {
  if (response.status === "success") {
    return response.data;
  } else if (response.status === "fail") {
    const errorMessages = Object.entries(response.data)
      .map(([field, message]) => `${field}: ${message}`)
      .join(", ");
    throw new Error(errorMessages);
  } else {
    throw new Error("Unexpected response status");
  }
}

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
}

function changeThemeColors(themeColors: {
  themeColor: string;
  accentColor: string;
}) {
  const { themeColor, accentColor } = themeColors;
  const root = document.documentElement;
  root.style.setProperty("--color-theme", themeColor);
  root.style.setProperty("--color-accent", accentColor);
}

function caplitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const brightColors = [
  "#FF5733",
  "#FFC300",
  "#DAF7A6",
  "#FF33FF",
  "#33FFCE",
  "#FF33D6",
  "#4CFF33",
  "#33C3FF",
  "#C733FF",
  "#FF5733",
  "#FFBD33",
  "#D433FF",
  "#FFFF00",
  "#ADFF2F",
  "#FFA500",
  "#00FF7F",
  "#00BFFF",
  "#FF1493",
  "#00CED1",
  "#9400D3",
  "#FF4500",
  "#FFD700",
  "#32CD32",
];
function getRandomBrightColor(i: number) {
  return brightColors[i % brightColors.length];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getErrorMessage(error: any) {
  return error.response.data.message;
}

export {
  QUERY_TIMEOUT,
  defaultQueryState,
  formatDateToRelativeTime,
  formatNumToK,
  makeId,
  debounce,
  getTimeZone,
  getDaysInMonth,
  handleServerResponse,
  copyToClipboard,
  formatDateToCleanString,
  changeThemeColors,
  caplitalizeFirstLetter,
  getRandomBrightColor,
  getErrorMessage,
};
