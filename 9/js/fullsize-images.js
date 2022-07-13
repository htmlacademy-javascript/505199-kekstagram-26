import { isEscapeKey } from './utils.js';

const COMMENTS_LIMIT = 5;
let copyComments = [];

const bigPictureContainer = document.querySelector('.big-picture');

const bigPicture = bigPictureContainer.querySelector('.big-picture__img img');

const cancelButton = bigPictureContainer.querySelector('#picture-cancel');

const likesCount = bigPictureContainer.querySelector('.likes-count');

const socialCommentsContainer =
  bigPictureContainer.querySelector('.social__comments');

const postComment = bigPictureContainer.querySelector('.social__comment');

const postDescription = bigPictureContainer.querySelector('.social__caption');

const commentsCount = bigPictureContainer.querySelector('.comments-count');

const socialCommentCount = bigPictureContainer.querySelector(
  '.social__comment-count'
);

const commentsLoader = bigPictureContainer.querySelector('.comments-loader');

// Функция для показа комментариев к посту

const renderComments = (comments) => {
  if (!comments.length) {
    return;
  }
  const commentFragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    const commentItem = postComment.cloneNode(true);

    commentItem.querySelector('.social__picture').src = comment.avatar;
    commentItem.querySelector('.social__text').textContent = comment.message;

    commentFragment.append(commentItem);
  });
  socialCommentsContainer.append(commentFragment);
};

//Функция для показа кнопки загрузки дополнительных комментариев

const showCommentsLoader = () => {
  commentsLoader.classList.remove('hidden');
};

//Функция скрытия кнопки загрузки дополнительных комментариев

const hideCommentsLoader = () => {
  commentsLoader.classList.add('hidden');
};

// Функция загрузки дополнительных комментариев

function getMoreComments() {
  showCommentsLoader();
  renderComments(copyComments.splice(0, COMMENTS_LIMIT));
  socialCommentCount.textContent =
    document.querySelectorAll('.social__comment').length;
  if (!copyComments.length) {
    hideCommentsLoader();
  }
}

// Функция показа полноразмерных фотографий
const showFullSizePicture = (post) => {
  bigPictureContainer.classList.remove('hidden');
  document.body.classList.add('modal-open');

  bigPicture.src = post.url;
  likesCount.textContent = post.likes;
  commentsCount.textContent = post.comments.length;
  postDescription.textContent = post.description;

  socialCommentsContainer.innerHTML = '';
  copyComments = [...post.comments];
  getMoreComments();
  document.addEventListener('keydown', onFullSizePictureEsc);
};

// Функция закрытия окна полноразмерного изображения

const onHideFullSizePicture = () => {
  bigPictureContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onFullSizePictureEsc);
};

function onFullSizePictureEsc(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onHideFullSizePicture();
  }
}

cancelButton.addEventListener('click', onHideFullSizePicture);
commentsLoader.addEventListener('click', () => getMoreComments());

export { showFullSizePicture };
