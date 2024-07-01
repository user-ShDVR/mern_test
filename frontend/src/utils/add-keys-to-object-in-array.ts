import { generateUniqueId } from "./generate-unique-Id";

interface IAddKeysToObjectInArrayArgs<T> {
  array: T[];
}

export const addKeysToObjectInArray = <T extends { key?: string }>(
  args: IAddKeysToObjectInArrayArgs<T>
) => {
  const { array } = args;

  return [...array].map((object) => {
    if (!object.key) {
      return { ...object, key: generateUniqueId() };
    }

    return object;
  });
};
