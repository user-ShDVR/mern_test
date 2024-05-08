export const searchedOptions = (
  enteredValue: string,
  option?: Record<string, string>
): boolean => {
  if (!option) return false;
  return option.label.toLowerCase().includes(enteredValue.toLowerCase());
};
