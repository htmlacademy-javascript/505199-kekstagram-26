import { checkStringLength, isEscapeKey } from './utils.js';
import { openMessagePopup } from './message-popup.js';
import { sendData } from './api.js';
import { closeEditImagePopup } from './upload-image.js';

const COMMENTS_MAX_LENGTH = 140;
const HASHTAGS_MAX_AMOUNT = 5;
const HASHTAGS_MAX_LENGTH = 20;
const REGULAR_EXPRESSION = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const hashtagValidateRegExp = new RegExp(REGULAR_EXPRESSION);

const uploadImageForm = document.querySelector('#upload-select-image');

const hashtagsInput = uploadImageForm.querySelector('.text__hashtags');

const commentsInput = uploadImageForm.querySelector('.text__description');

const uploadSubmitButton = uploadImageForm.querySelector('#upload-submit');

//Блокировка кнопки формы

const blockSubmitButton = () => {
  uploadSubmitButton.disabled = true;
  uploadSubmitButton.textContent = 'Ожидайте, загружаем файл...';
};

//Отмена блокировки кнопки фомы

const unBlockSubmitButton = () => {
  uploadSubmitButton.disabled = false;
  uploadSubmitButton.textContent = 'Опубликовать';
};

const pristine = new Pristine(uploadImageForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'is-invalid',
  successClass: 'is-valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'error-text',
});

const uploadFormValidate = () => {
  pristine.validate();
};

// Хэш-теги:
// Хэш-тег начинается с символа # (решётка);
const checkHashtagPrefixs = (value) => {
  if (value === '') {
    return true;
  }
  return value
    .trim()
    .split(' ')
    .filter((word) => word !== '')
    .every((word) => word.startsWith('#'));
};

// Проверка хэш-тегов на основе регулярного выражения

const checkIsValidHashtag = (arrayItem) =>
  hashtagValidateRegExp.test(arrayItem);

const checkIsValidHashtags = (value) => {
  if (value === '') {
    return true;
  }
  return value
    .trim()
    .split(' ')
    .filter((word) => word !== '')
    .every(checkIsValidHashtag);
};

// Нельзя указать больше пяти хэш-тегов

const checkHashtagsCount = (value) =>
  value
    .trim()
    .split(' ')
    .filter((word) => word !== '').length <= HASHTAGS_MAX_AMOUNT;

// Хэш-теги разделяются пробелами

const checkEmptyTags = (value) => {
  if (value === '') {
    return true;
  }
  return !value
    .trim()
    .split(' ')
    .some((word) => word === '');
};

// Максимальная длина одного хэш-тега 20 символов

const checkHashtagLength = (value) =>
  value.split(' ').every((hashtag) => hashtag.length <= HASHTAGS_MAX_LENGTH);

// Наличие пробелов в конце

const checkHashtagsTrailingSpace = (value) => !value.endsWith(' ');

//Один и тот же хэш-тег не может быть использован дважды;

const validateIsDuplicateHashtags = (value) => {
  const hashtags = value
    .trim()
    .toLowerCase()
    .split(' ')
    .filter((word) => word !== '');
  const uniqueHashtags = new Set(hashtags);
  return uniqueHashtags.size === hashtags.length;
};

// Функция проверки длинны комментария

const validateComment = (value) =>
  checkStringLength(value, COMMENTS_MAX_LENGTH);

pristine.addValidator(
  hashtagsInput,
  checkHashtagsCount,
  `Не более ${HASHTAGS_MAX_AMOUNT} хеш-тегов`,
  1,
  false
);
pristine.addValidator(
  hashtagsInput,
  checkEmptyTags,
  'Хеш-теги разделяются одним пробелом',
  1,
  false
);
pristine.addValidator(
  hashtagsInput,
  checkHashtagLength,
  `Длина хештега не должна превышать ${HASHTAGS_MAX_LENGTH} символов`,
  1,
  true
);
pristine.addValidator(
  hashtagsInput,
  checkIsValidHashtags,
  'Строка после решётки может состоять только из букв и чисел',
  1,
  false
);
pristine.addValidator(
  hashtagsInput,
  checkHashtagsTrailingSpace,
  'В поле ввода хеш-тегов не должно быть пробелов в конце',
  1,
  false
);
pristine.addValidator(
  hashtagsInput,
  checkHashtagPrefixs,
  'Хеш-тег должен начинаться с #',
  1,
  true
);
pristine.addValidator(
  hashtagsInput,
  validateIsDuplicateHashtags,
  'Хеш-теги не должны повторяться',
  1,
  false
);
pristine.addValidator(
  commentsInput,
  validateComment,
  `Длина комментария не может составлять больше ${COMMENTS_MAX_LENGTH} символов`,
  1,
  false
);

//Обработчик для отправки формы

uploadImageForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (!isValid) {
    return;
  }

  const formData = new FormData(evt.target);
  blockSubmitButton();

  const onSuccess = () => {
    closeEditImagePopup();
    unBlockSubmitButton();
    openMessagePopup('success');
  };

  const onError = () => {
    closeEditImagePopup();
    unBlockSubmitButton();
    openMessagePopup('error');
  };

  sendData(formData, onSuccess, onError);
});

// Отмена закрытия модального окна, фокус в поле ввода хеш-тегов

hashtagsInput.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
});

// Отмена закрытия модального окна, фокус в поле ввода комментариев

commentsInput.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
});

export { uploadFormValidate };
