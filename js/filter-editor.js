import { renderPosts } from './posts.js';
import { debounce, getRandomIntBetweenRange } from './utils.js';

const POST_MAX_COUNT = 10;

const postsContainer = document.querySelector('.pictures');
const imageFiltersSection = document.querySelector('.img-filters');
const imageFiltersForm =
  imageFiltersSection.querySelector('.img-filters__form');
const filterButton = imageFiltersSection.querySelectorAll(
  '.img-filters__button'
);

const showFilterPosts = () => {
  imageFiltersSection.classList.remove('img-filters--inactive');
  imageFiltersSection.classList.add('img-filters--active');
};

const disableFilterPosts = () => {
  filterButton.forEach((button) => {
    button.disabled = true;
  });
};

const enableFilterPosts = () => {
  filterButton.forEach((button) => {
    button.disabled = false;
  });
};

// Фотографии в изначальном порядке с сервера

const filterPostsDefault = (userPosts) => userPosts;

// Фотографии, отсортированные в порядке убывания количества комментариев

const filterPostsDiscuss = (userPosts) =>
  userPosts
    .slice()
    .sort(
      (commentA, commentB) =>
        commentB.comments.length - commentA.comments.length
    );

// Случайные, не повторяющиеся фотографии

const filterPostsRandom = (posts, maxCount) => {
  const startIndex = 0;
  const lastIndex = posts.length - 1;
  const elementsCount = Math.min(posts.length, maxCount);
  const randomPostsIndexes = getRandomIntBetweenRange(
    startIndex,
    lastIndex,
    elementsCount
  );
  return randomPostsIndexes.map((index) => posts[index]);
};

const changeFilterClassName = (filterName) => {
  document
    .querySelectorAll('.img-filters__button')
    .forEach((element) =>
      element.classList.remove('img-filters__button--active')
    );
  document
    .querySelector(`#${filterName}`)
    .classList.add('img-filters__button--active');
};

const clearOldPosts = () => {
  const posts = postsContainer.querySelectorAll('.picture');

  posts.forEach((post) => {
    post.remove();
  });
};

const postFilterChange = debounce((evt, userPosts) => {
  if (!evt.target.classList.contains('img-filters__button')) {
    return;
  }
  const filter = evt.target.id;

  clearOldPosts();

  switch (filter) {
    case 'filter-discussed':
      changeFilterClassName(filter);
      renderPosts(filterPostsDiscuss(userPosts));
      break;
    case 'filter-random':
      changeFilterClassName(filter);
      renderPosts(filterPostsRandom(userPosts, POST_MAX_COUNT));
      break;
    case 'filter-default':
      changeFilterClassName(filter);
      renderPosts(filterPostsDefault(userPosts));
      break;
  }
});

const initPostsFilter = (userPosts) => {
  imageFiltersForm.addEventListener('click', (evt) =>
    postFilterChange(evt, userPosts)
  );
  showFilterPosts();
  enableFilterPosts();
};

export { initPostsFilter, disableFilterPosts };
