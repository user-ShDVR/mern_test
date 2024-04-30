interface IDeclinationArgs {
  one: string;
  few: string;
  many: string;
  value?: number;
}

export const getDeclination = (args: IDeclinationArgs) => {
  const { one, few, many, value } = args;

  if (value) {
    if (value % 10 === 1 && value % 100 !== 11) {
      return `${value} ${one}`;
    }

    if (
      value % 10 >= 2 &&
      value % 10 <= 4 &&
      (value % 100 < 10 || value % 100 >= 20)
    ) {
      return `${value} ${few}`;
    }
  }

  return `${value} ${many}`;
};
