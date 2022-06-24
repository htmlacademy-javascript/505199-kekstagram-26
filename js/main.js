import { generatePosts } from './data.js';
import { renderPosts } from './posts.js';

const userPosts = generatePosts();
renderPosts(userPosts);
