const EFFECT_CONFIG = {
  chrome: {
    options: {
      range: { min: 0, max: 1 },
      start: 1,
      step: 0.1,
    },
    style: 'grayscale',
    unit: '',
  },

  sepia: {
    options: {
      range: { min: 0, max: 1 },
      start: 1,
      step: 0.1,
    },
    style: 'sepia',
    unit: '',
  },

  marvin: {
    options: {
      range: { min: 0, max: 100 },
      start: 100,
      step: 1,
    },
    style: 'invert',
    unit: '%',
  },

  phobos: {
    options: {
      range: { min: 0, max: 3 },
      start: 3,
      step: 0.1,
    },
    style: 'blur',
    unit: 'px',
  },

  heat: {
    options: {
      range: { min: 1, max: 3 },
      start: 3,
      step: 0.1,
    },
    style: 'brightness',
    unit: '',
  },
};

const NO_EFFECT = 'none';

const uploadImageForm = document.querySelector('#upload-select-image');
const imageUploadSection = document.querySelector('.img-upload__overlay');

const imageLevelEffect = document.querySelector('.img-upload__effect-level');

const effectLevelSlider = imageUploadSection.querySelector(
  '.effect-level__slider'
);
const effectInputValue = imageUploadSection.querySelector(
  '.effect-level__value'
);

const imageUploadPreview = imageUploadSection.querySelector(
  '.img-upload__preview img'
);

// Наложение эффектов на изображение

const updateSliderConfig = (effectName) => {
  effectLevelSlider.noUiSlider.updateOptions(effectName.options);
};

const imageEffectReset = () => {
  imageUploadPreview.style.filter = NO_EFFECT;
  imageUploadPreview.className = '';
  effectInputValue.value = '';
  imageLevelEffect.classList.add('hidden');
};

const onChangeImageEffect = (evt) => {
  const effectName = evt.target.value;
  imageUploadPreview.className = '';
  imageUploadPreview.classList.add(`effects__preview--${effectName}`);
  if (effectName === NO_EFFECT) {
    imageEffectReset();
  } else {
    imageLevelEffect.classList.remove('hidden');
    updateSliderConfig(EFFECT_CONFIG[effectName]);
  }
};

const onChangeEffectValue = (handlersValue) => {
  const value = handlersValue[0];
  const effectName = uploadImageForm.effect.value;
  if (effectName === NO_EFFECT) {
    return;
  }
  const filterName = EFFECT_CONFIG[effectName].style;
  const filterUnits = EFFECT_CONFIG[effectName].unit;
  imageUploadPreview.style.filter = `${filterName}(${value}${filterUnits})`;
  effectInputValue.value = value;
};

export { onChangeImageEffect, onChangeEffectValue };
