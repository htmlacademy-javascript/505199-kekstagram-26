import { getRandomInt } from './utils.js';

const POSTS_AMOUNT = 25;

const MIN_AVATAR_NUMBER = 1;

const MAX_AVATAR_NUMBER = 6;

const USERS_NAMES = [
  'James',
  'Mary',
  'Rodert',
  'Patricia',
  'John',
  'Jennifer',
  'David',
];

const USERS_COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const PHOTO_DESCRIPTIONS = [
  'Whatever is good for your soul, do that',
  'Even the stars were jealous of the sparkle in her eyes',
  'Stress less and enjoy the best',
  'I’m not high maintenance, you’re just low effort',
  'Life is better when you’re laughing',
  'Look for the magic in every moment',
  'Do whatever makes you happiest',
];

// Создание содержания комментария

const createCommentsContent = () => ({
  id: getRandomInt(1, 100),
  avatar: `img/avatar-${getRandomInt(
    MIN_AVATAR_NUMBER,
    MAX_AVATAR_NUMBER
  )}.svg`,
  message: USERS_COMMENTS[getRandomInt(0, USERS_COMMENTS.length - 1)],
  name: USERS_NAMES[getRandomInt(0, USERS_NAMES.length - 1)],
});

// Генерация поста

const generatePost = (index) => ({
  id: index + 1,
  url: `photos/${index + 1}.jpg`,
  description:
    PHOTO_DESCRIPTIONS[getRandomInt(0, PHOTO_DESCRIPTIONS.length - 1)],
  likes: getRandomInt(15, 200),
  comments: Array.from({ length: getRandomInt(0, 6) }, (_, i) =>
    createCommentsContent(i)
  ),
});

// Генерация массива постов

const generatePosts = () =>
  Array.from({ length: POSTS_AMOUNT }, (_, i) => generatePost(i));

export { generatePosts };
