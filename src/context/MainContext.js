import { cloneDeep } from 'lodash';
import React, { useState, useEffect, useContext, createContext } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { 
  createPost,
  editPost,
  getAlbumsByUserId, 
  getCommentsByPostId, 
  getPhotosByAlbumId, 
  getPostsByUserId, 
  getUsers, 
  postCommentsByPostId
} from '../client/MainApi';
import { errorNotif, successNotif } from '../utils/Utils';

const MainContext = createContext(null);

export const MainProvider = (props) => {
  const history = useHistory();
  const { pathname } = useLocation();

  const [filterOption, setFilterOption] = useState('user');
  const [activeNavbar, setActiveNavbar] = useState('main');
  const [activeUser, setActiveUser] = useState(1);

  const [users, setUsers] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [posts, setPosts] = useState({});
  const [comments, setComments] = useState({});

  const [currentModalOpen, setCurrentModalOpen] = useState({});

  // to count how many time we've created a post and convert it to id
  const [postCounter, setPostCounter] = useState(1);

  const handleActiveNavbar = (e) => {
    setActiveNavbar(e.key);
    history.push(`/${e.key}`);
  }

  const onClickCard = (type, id, data) => {
    history.push(`/${type}/${id}`);
    setActiveNavbar(type);
  }

  const onRedirect = (url) => {
    history.push(url);
    setActiveNavbar('');
  }

  const onChangeFilterOption = (e) => {
    setFilterOption(e.target.value)
  }

  const onChangeActiveUser = (value) => {
    setActiveUser(value);
  }

  const _getAlbumsByUserId = async(id) => {
    try {
      const { data } = await getAlbumsByUserId(id || activeUser);
      if (data.length) {
        setAlbums(data);
      }
    } catch (error) {
      console.error('albums-error', error)
      errorNotif('Albums | Something went wrong')
    }
  }

  const _getPostsByUserId = async(id) => {
    try {
      const temp = cloneDeep(posts);
      const { data } = await getPostsByUserId(id || activeUser);
      if (data.length) {
        temp[id || activeUser] = data
        setPosts(temp);
      }
    } catch (error) {
      console.error('posts-error', error)
      errorNotif('Posts | Something went wrong')
    }
  }

  const _getPhotosByAlbumId = async(albumId) => {
    try {
      const { data } = await getPhotosByAlbumId(albumId);
      if (data.length) {
        setPhotos(data);
      }
    } catch (error) {
      console.error('photos-error', error);
      errorNotif('Photos | Something went wrong')
    }
  }

  const _getCommentsByPostId = async(postId) => {
    try {
      const temp = cloneDeep(comments);
      const { data } = await getCommentsByPostId(postId);
      if (data.length) {
        temp[postId] = data
        setComments(temp);
      }
    } catch (error) {
      console.error('comments-error', error);
      errorNotif('Comments | Something went wrong')
    }
  }

  const _getUsers = async() => {
    try {
      const { data } = await getUsers();
      if (data.length) {
        setUsers(data);
      }
    } catch (error) {
      console.error('users-error', error)
      errorNotif('Users | Something went wrong')
    }
  }

  const onSubmitComment = async(value, postId) => {
    try {
      const temp = cloneDeep(comments);
      const currArr = temp[postId];
      const body = {
        body: value,
        postId: Number(postId),
        email: 'irsal@hehehe.com',
        id: currArr?.length ? currArr[currArr.length - 1].id + 1 : 1
      }
      const { data } = await postCommentsByPostId(body);
      if (data.id) {
        if (currArr?.length) {
          temp[postId].push(body);
        } else {
          temp[postId] = [body];
        }
        setComments(temp);
      }
    } catch (error) {
      console.error('create-comment-error', error)
      errorNotif('Create Comment | Something went wrong')
    }
  }

  const onDeleteComment = (data) => {
    const temp = cloneDeep(comments);
    temp[data.postId] = temp[data.postId].filter((v) => v.id !== data.id);
    setComments(temp);
  }

  const onUpdateComment = (data, comment) => {
    const temp = cloneDeep(comments);
    const index = temp[data.postId].findIndex((v) => v.id === data.id);
    temp[data.postId][index].body = comment;
    setComments(temp);
    setCurrentModalOpen({});
  }
  
  const onCreatePost = async (body, userData) => {
    try {
      const userId = userData.id
      const temp = cloneDeep(posts);
      const currArr = temp[userId];
      const newBody = { 
        ...body, 
        userId, 
        id: currArr[currArr.length - 1].id + 1
      }
      const { data } = await createPost(newBody);
      if (data.id) {
        successNotif('Success create a post');
        newBody.id = data.id + postCounter;
        temp[userId].push(newBody);
        setPosts(temp);
      }
    } catch (error) {
      console.error('create-post-error', error)
      errorNotif('Create post | Something went wrong')
    }
  }

  const onEditPost = async(body) => {
    const userId = body.userId
    const temp = cloneDeep(posts);
    const index = temp[userId].findIndex((v) => v.id === body.id);
    try {
      const { data } = await editPost(body.id, body);
      if (data.id) {
        temp[userId][index] = body;
        setPosts(temp);
        successNotif('Success update a post');
      }
    } catch (error) {
      console.error('update-post-error', error)
      errorNotif('Update post | Something went wrong')

      if (body.id > 100) {
        temp[userId][index] = body;
        setPosts(temp);
      }
    }
  }

  const onSubmitPost = async(body, userData, type) => {
    if (type === 'create') {
      await onCreatePost(body, userData);
    } else if (type === 'edit') {
      await onEditPost(body);
    } else if (type === 'delete') {
      
    }

    setPostCounter((prev) => prev + 1);
    setCurrentModalOpen({});
  }

  useEffect(() => {
    const curr = pathname === '/' ? 'main' : pathname.replace('/', '');
    setActiveNavbar(curr);
    _getUsers();
  }, [])
  
  return (
    <MainContext.Provider 
      {...props}
      value={{
        users, albums, photos, comments,
        posts,
        activeUser,
        activeNavbar, handleActiveNavbar,
        filterOption, onChangeFilterOption,
        onClickCard, onRedirect,
        onChangeActiveUser,
        _getAlbumsByUserId, _getPostsByUserId,
        _getPhotosByAlbumId, _getCommentsByPostId,
        onSubmitComment, onUpdateComment, onDeleteComment,
        currentModalOpen, setCurrentModalOpen,
        onSubmitPost,
        postCounter
      }}
    />
  )
}

export const useMainContext = () => useContext(MainContext);