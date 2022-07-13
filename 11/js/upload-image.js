import { isEscapeKey } from './utils.js';
import { openMessagePopup } from './message-popup.js';
import { addScaleHandler, removeScaleHandler } from './scale-editor.js';
import { onChangeImageEffect, onChangeEffectValue } from './slider-effects.js';
import { uploadFormValidate } from './form.js';

const IMAGE_SCALE = 100;

const imageUpload = document.body.querySelector('.img-upload');

const uploadFile = imageUpload.querySelector('#upload-file');

const imageUploadPopup = imageUpload.querySelector('.img-upload__overlay');

const imageUploadPreview = imageUpload.querySelector(
  '.img-upload__preview img'
);

const uploadCancel = imageUpload.querySelector('#upload-cancel');

const uploadImageForm = imageUpload.querySelector('#upload-select-image');

const scaleControl = imageUpload.querySelector('.scale__control--value');
const effectLevelSlider = imageUpload.querySelector('.effect-level__slider');
const imageEffects = document.querySelector('.img-upload__effects');
const imageLevelEffect = document.querySelector('.img-upload__effect-level');

// Все данные, введённые в форму, и контрол фильтра приходят в исходное состояние:

const clearUserEnterData = () => {
  scaleControl.value = `${IMAGE_SCALE}%`;
  imageUploadPreview.style = 'transform: scale(1)';

  uploadImageForm.reset();
  imageUploadPreview.style.filter = 'none';
  imageUploadPreview.src = '';
};

// Форма редактирования изображения закрывается

const closeEditImagePopup = () => {
  imageUploadPopup.classList.add('hidden');
  document.body.classList.remove('modal-open');

  removeScaleHandler();
  document.removeEventListener('keydown', onEditPopupEsc);

  imageEffects.removeEventListener('change', onChangeImageEffect);
  effectLevelSlider.noUiSlider.destroy();

  clearUserEnterData();
};

// Форма редактирования изображения открывается

function openEditImagePopup() {
  const file = this.files[0];

  if (!file.type.startsWith('image/')) {
    openMessagePopup('error');
    return;
  }

  imageLevelEffect.classList.add('hidden');

  imageUploadPopup.classList.remove('hidden');
  document.body.classList.add('modal-open');
  uploadFormValidate();

  addScaleHandler();

  document.addEventListener('keydown', onEditPopupEsc);

  const uiSlider = noUiSlider.create(effectLevelSlider, {
    range: { min: 0, max: 1 },
    start: 1,
    step: 0.1,
    connect: 'lower',
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });

  uiSlider.on('update', onChangeEffectValue);

  imageEffects.addEventListener('change', onChangeImageEffect);

  const fileReader = new FileReader();
  fileReader.onload = (evt) => {
    imageUploadPreview.src = evt.target.result;
  };
  fileReader.readAsDataURL(file);
}

function onEditPopupEsc(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeEditImagePopup();
  }
}

uploadFile.addEventListener('change', openEditImagePopup);
uploadCancel.addEventListener('click', () => closeEditImagePopup());

export { onEditPopupEsc, closeEditImagePopup };
