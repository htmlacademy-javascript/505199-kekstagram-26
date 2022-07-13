const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;
const SCALE_STEP = 25;
const SCALE_DIVIDER = 100;

const imagePreviewContainer = document.querySelector(
  '.img-upload__preview-container'
);
const scaleControlSmaller = imagePreviewContainer.querySelector(
  '.scale__control--smaller'
);

const scaleControlBigger = imagePreviewContainer.querySelector(
  '.scale__control--bigger'
);

const scaleControlValue = imagePreviewContainer.querySelector(
  '.scale__control--value'
);

const imageUploadPreview = imagePreviewContainer.querySelector(
  '.img-upload__preview img'
);

//Уменьшение масштаба
const decreaseScale = () => {
  let scale = parseInt(scaleControlValue.value, 10);
  if (scale > MIN_SCALE) {
    scale -= SCALE_STEP;
    scaleControlValue.value = `${scale}%`;
    imageUploadPreview.style = `transform: scale(${scale / SCALE_DIVIDER})`;
  }
};

//Увеличение масштаба

const increaseScale = () => {
  let scale = parseInt(scaleControlValue.value, 10);
  if (scale < MAX_SCALE) {
    scale += SCALE_STEP;
    scaleControlValue.value = `${scale}%`;
    imageUploadPreview.style = `transform: scale(${scale / SCALE_DIVIDER})`;
  }
};

const addScaleHandler = () => {
  scaleControlValue.value = `${DEFAULT_SCALE}%`;
  scaleControlSmaller.addEventListener('click', decreaseScale);
  scaleControlBigger.addEventListener('click', increaseScale);
};

const removeScaleHandler = () => {
  scaleControlSmaller.removeEventListener('click', decreaseScale);
  scaleControlBigger.removeEventListener('click', increaseScale);
};

export { addScaleHandler, removeScaleHandler };
