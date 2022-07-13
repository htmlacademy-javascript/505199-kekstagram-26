import { getData } from './api.js';
import { initPostsFilter, disableFilterPosts } from './filter-editor.js';
import { renderPosts } from './posts.js';
import './upload-image.js';
import './form.js';

disableFilterPosts();

getData((posts) => {
  renderPosts(posts);
  initPostsFilter(posts);
});
