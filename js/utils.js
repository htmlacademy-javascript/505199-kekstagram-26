// Ограничение длины строки

const checkStringLength = (currentString, maxLength) =>
  currentString.length <= maxLength;

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

// Функция перетасовки массива

const getShuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

// Функция получения случайных уникальных чисел в допустимом диапазоне

const getRandomIntBetweenRange = (from, to, resultsLimit) => {
  const range = Math.abs(from - to);
  if (!range) {
    return [];
  }
  const resultsCount = Math.min(range, resultsLimit);
  const minValue = Math.min(from, to);
  const values = Array.from({ length: range }, (_, index) => minValue + index);
  return getShuffleArray(values).splice(0, resultsCount);
};

export { checkStringLength, isEscapeKey, debounce, getRandomIntBetweenRange };
