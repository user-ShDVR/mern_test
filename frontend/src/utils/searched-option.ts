import { TObjWithStringValues } from "types/TObjWithStringValues";

export const searchedOptions = (
  enteredValue: string,
  option?: TObjWithStringValues
): boolean => {
  if (!option) return false;
  return option.label.toLowerCase().includes(enteredValue.toLowerCase());
};
