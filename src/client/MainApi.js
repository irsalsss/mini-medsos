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

export const postCommentsByPostId = (body) => {
  return client(`https://jsonplaceholder.typicode.com/comments`, { method: 'POST', body: JSON.stringify(body) });
}

export const createPost = (body) => {
  return client(`https://jsonplaceholder.typicode.com/posts`, { method: 'POST', body: JSON.stringify(body) });
}

export const editPost = (id, body) => {
  return client(`https://jsonplaceholder.typicode.com/posts/${id}`, { method: 'PUT', body: JSON.stringify(body) });
}

export const deletePost = (id) => {
  return client(`https://jsonplaceholder.typicode.com/posts/${id}`, { method: 'DELETE' });
}