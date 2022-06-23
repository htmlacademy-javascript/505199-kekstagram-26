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

export { getRandomInt, checkStringLength };
