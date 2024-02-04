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

// поиск окончаний "сообщения" в зависимости от количества
const pluralize = (forms, n) => {
  let idx;

  if (n === 0) {
    idx = 0;
  } else if (n % 10 === 1 && n % 100 !== 11) {
    idx = 1; // one
  } else if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) {
    idx = 2; // few
  } else {
    idx = 2; // many
  }
  return forms[idx];
};

export {
  getRandomInteger,
  getRandomArrayElement,
  getArrayFromRandomElements,
  pluralize
};
