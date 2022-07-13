import { showFullSizePicture } from './fullsize-images.js';

const renderPosts = (userPosts) => {
  const usersPhotos = document.querySelector('.pictures');

  // Шаблон для данных фотографий от случайных пользователей

  const userPhotoTemplate = document
    .querySelector('#picture')
    .content.querySelector('.picture');

  const photoGalleryFragment = document.createDocumentFragment();

  userPosts.forEach((userPost) => {
    const userPhotoElement = userPhotoTemplate.cloneNode(true);

    userPhotoElement.querySelector('.picture__img').src = userPost.url;

    userPhotoElement.querySelector('.picture__comments').textContent =
      userPost.comments.length;

    userPhotoElement.querySelector('.picture__likes').textContent =
      userPost.likes;

    photoGalleryFragment.append(userPhotoElement);

    userPhotoElement.addEventListener('click', () => {
      showFullSizePicture(userPost);
    });
  });
  usersPhotos.append(photoGalleryFragment);
};

export { renderPosts };
