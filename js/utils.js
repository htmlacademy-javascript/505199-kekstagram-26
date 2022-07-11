//Получение случайного числа в выбранном диапазоне

const getRandomInt = function (min, max) {
  if (min >= 0 && min < max) {
    const rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }
  throw new Error('Переданный диапазон чисел введен некорректно');
};

getRandomInt(15, 48);

// Ограничение длины строки

const checkStringLength = function (currentString, maxLength) {
  return currentString.length <= maxLength;
};

checkStringLength('she sells seashels', 20);

// Функция прерывания или закрытия текущего процесса

const isEscapeKey = (evt) => evt.key === 'Escape';

// Функция устранения 'дребезга' при переключении фильтра

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const getShuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

const randomIntegersBetweenRange = (from, to, resultsLimit) => {
  const range = Math.abs(from - to);
  if (!range) {
    return [];
  }
  const resultsCount = Math.min(range, resultsLimit);
  const minValue = Math.min(from, to);
  const values = Array.from({ length: range }, (_, index) => minValue + index);
  return getShuffleArray(values).splice(0, resultsCount);
};

export {
  getRandomInt,
  checkStringLength,
  isEscapeKey,
  debounce,
  randomIntegersBetweenRange,
};
