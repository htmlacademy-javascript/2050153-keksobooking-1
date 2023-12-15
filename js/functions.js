// Функция-палиндром (слово или фраза, которые одинаково читаются и слева направо и справа налево)

/*
// Строка является палиндромом
имяФункции('топот'); // true
// Несмотря на разный регистр, тоже палиндром
имяФункции('ДовОд'); // true
// Это не палиндром
имяФункции('Кекс');  // false
// Это палиндром
имяФункции('Лёша на полке клопа нашёл '); // true
*/

const clearString = /[^A-Za-zА-Яа-я0-9]/g; // RegExp

const isStringPalindrome = (checkedString) => {
  // Step 1. Lowercase the string and use the RegExp to remove unwanted characters from it
  const regularString = checkedString.toLowerCase().replace(clearString, '');

  // Step 2. reverse string
  const reverseString = regularString.split('').reverse().join('');

  // Step 3. Check if reverse string is strictly equals to regularString and return a Boolean
  return reverseString === regularString;
};

const isStringPalindromeSecondVersion = (checkedString) => {
  checkedString = checkedString.toLowerCase().replace(clearString, '');
  // Step 2. Create the FOR loop
  const stringLength = checkedString.length;

  // Step 3. Check if one half of string same as a second half.
  for (let i = 0; i < stringLength / 2; i++) {
    if (checkedString[i] !== checkedString[stringLength - 1 - i]) {
      return false;
    }
  }

  // Both parts are strictly equal, it returns true => The string is a palindrome
  return true;
};

console.log(isStringPalindrome('топот'), isStringPalindromeSecondVersion('топот'));
console.log(isStringPalindrome('ДовОд'), isStringPalindromeSecondVersion('ДовОд'));
console.log(isStringPalindrome('Кекс'), isStringPalindromeSecondVersion('Flnt'));
console.log(isStringPalindrome('Лёша на полке клопа нашёл '), isStringPalindromeSecondVersion('Лёша на полке клопа нашёл '));
console.log(isStringPalindrome('0_0 (: /-\ :) 0–0'), isStringPalindromeSecondVersion('0_0 (: /-\ :) 0–0'));


// Функция, которая принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа.
// Если в строке нет ни одной цифры, функция должна вернуть NaN.

/*
extractNumbers('2023 год');            // 2023
extractNumbers('ECMAScript 2022');     // 2022
extractNumbers('1 кефир, 0.5 батона'); // 105
extractNumbers('агент 007');           // 7
extractNumbers('а я томат');           // NaN

Если хотите усложнить задание, предусмотрите случай, когда вместо строки приходит число:

extractNumbers(2023); // 2023
extractNumbers(-1);   // 1
extractNumbers(1.5);  // 15
*/

const justNumbers = /[^0-9]/g;

const extractNumbers = (checkedString) => parseInt(checkedString.toString().replace(justNumbers, ''), 10);

console.log(extractNumbers('2023 год')); // 2023
console.log(extractNumbers('ECMAScript 2022')); // 2022
console.log(extractNumbers('1 кефир, 0.5 батона')); // 105
console.log(extractNumbers('агент 007')); // 7
console.log(extractNumbers('а я томат')); // NaN
console.log(extractNumbers(2023)); // 2023
console.log(extractNumbers(-1)); // 1
console.log(extractNumbers(1.5)); // 15

// Функция, которая принимает три параметра: исходную строку, минимальную длину и строку с добавочными символами
// — и возвращает исходную строку, дополненную указанными символами до заданной длины.
// Символы добавляются в начало строки. Если исходная строка превышает заданную длину, она не должна обрезаться.
// Если «добивка» слишком длинная, она обрезается с конца.

/*
Эта функция нам пригодится для формирования адресов файлов. Примеры её использования:

// Добавочный символ использован один раз
имяФункции('1', 2, '0');      // '01'

// Добавочный символ использован три раза
имяФункции('1', 4, '0');      // '0001'

// Добавочные символы обрезаны с конца
имяФункции('q', 4, 'werty');  // 'werq'

// Добавочные символы использованы полтора раза
имяФункции('q', 4, 'we');     // 'wewq'

// Добавочные символы не использованы, исходная строка не изменена
имяФункции('qwerty', 4, '0'); // 'qwerty'

Попробуйте не использовать при этом функцию padStart() =)
*/

const addSymbols = (regularString, minlength, addithionString) => regularString.padStart(minlength, addithionString);

console.log(addSymbols('1', 2, '0')); // '01'

// Добавочный символ использован три раза
console.log(addSymbols('1', 4, '0')); // '0001'

// Добавочные символы обрезаны с конца
console.log(addSymbols('q', 4, 'werty')); // 'werq'

// Добавочные символы использованы полтора раза
console.log(addSymbols('q', 4, 'we')); // 'wewq'

// Добавочные символы не использованы, исходная строка не изменена
console.log(addSymbols('qwerty', 4, '0')); // 'qwerty'

// Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно.
// Будет использоваться для генерации временных географических координат в следующем задании.

/*
Пример использования функции:

имя_функции(от, до, количество_знаков_после_запятой);
// Результат: число с плавающей точкой из диапазона "от...до" с указанным "количеством знаков после запятой"

Учтите, что аргументами функции могут быть только положительные числа и ноль.
Если функции пришли неправильные аргументы, она должна вернуть NaN.
Не забудьте, что в случае с дробными числами диапазон может быть в десятых, сотых, тысячных и т. д. долях. Например, 1.1, 1.2 — корректный диапазон.

Придумайте, как функция будет вести себя, если передать значение «до» меньшее, чем значение «от», или равное ему.
 В этом случае вы можете вернуть NaN, поменять аргументы местами или выбрать другой вариант.

Функция может не гарантировать верный результат, если в переданном диапазоне нет ни одного подходящего числа.
*/

const getRandomInRange = (from, to, dotFixed) => {
  const rendomNumber = (Math.random() * (to - from) + from).toFixed(dotFixed) * 1;
  // .toFixed() returns string, so ' * 1' is a trick to convert to number;
  if (rendomNumber < 0 || to < from) {
    return NaN;
  }
  return rendomNumber;
};

console.log(getRandomInRange(-90,50,5)); // NaN or nn.nnnnn
console.log(getRandomInRange(90,50,3)); // NaN
console.log(getRandomInRange(90,150,4)); // nn/nnn.nnnn
console.log(getRandomInRange(150,150,2)); // 150
