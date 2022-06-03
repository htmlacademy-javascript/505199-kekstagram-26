const getRandomInt = function (min, max) {
  if (min >= 0 && min < max) {
    const rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }
  throw new Error('Переданный диапазон чисел введен некорректно');
};

getRandomInt(15, 48);

const checkStringLength = function (currentString, maxWidth) {
  return currentString.length <= maxWidth;
};

checkStringLength('she sells seashels', 20);
