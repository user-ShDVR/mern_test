export const searchedOptions = (enteredValue: string, option?: { label: string; value: string }): boolean => {
  if (!option) return false;
  return option.label.toLowerCase().includes(enteredValue.toLowerCase());
};
