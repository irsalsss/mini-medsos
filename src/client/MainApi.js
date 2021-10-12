import client from '../utils/ApiClient';

export const getUsers = () => {
  return client(`https://jsonplaceholder.typicode.com/users`);
}

export const getAlbumsByUserId = (id) => {
  return client(`https://jsonplaceholder.typicode.com/albums?userId=${id}`);
}

export const getPostsByUserId = (id) => {
  return client(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);
}

export const getPhotosByAlbumId = (id) => {
  return client(`https://jsonplaceholder.typicode.com/photos?albumId=${id}`);
}

export const getCommentsByPostId = (id) => {
  return client(`https://jsonplaceholder.typicode.com/comments?postId=${id}`);
}