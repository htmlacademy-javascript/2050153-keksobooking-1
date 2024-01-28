// получение случайного числа из диапазона
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// получение случайного значения из массива
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

// получение массива случайной длины из значений
const getArrayFromRandomElements = (chosenArrey) => Array.from(
  { length: getRandomInteger(0, chosenArrey.length - 1) },
  () => getRandomArrayElement(chosenArrey),
);

export {
  getRandomInteger,
  getRandomArrayElement,
  getArrayFromRandomElements
};
