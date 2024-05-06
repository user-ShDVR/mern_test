export const searchedOptions = (enteredValue: string, option) => {
  return option.label.toLowerCase().includes(enteredValue.toLowerCase());
};
