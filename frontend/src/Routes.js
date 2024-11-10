import { generatePath } from "react-router";

export const indexPattern = "/";
export const generateIndexPattern = () => {
  return generatePath(indexPattern);
};

export const taskPattern = "/task";
export const generateTaskPattern = () => {
  return generatePath(indexPattern);
};
