import { cloneDeep } from 'lodash';
import React, { useState, useEffect, useContext, createContext } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { 
  getAlbumsByUserId, 
  getCommentsByPostId, 
  getPhotosByAlbumId, 
  getPostsByUserId, 
  getUsers, 
  postCommentsByPostId
} from '../client/MainApi';
import { errorNotif } from '../utils/Utils';

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
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});

  const [currentModalOpen, setCurrentModalOpen] = useState({});

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
      const { data } = await getPostsByUserId(id || activeUser);
      if (data.length) {
        setPosts(data);
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
    const temp = cloneDeep(comments);
    const currArr = temp[postId];
    const body = {
      body: value,
      postId: Number(postId),
      email: 'irsal@hehehe.com',
      id: currArr[currArr.length - 1].id + 1
    }
    try {
      const { data } = await postCommentsByPostId(body);
      if (data.id) {
        temp[postId].push(body);
        setComments(temp);
      }
    } catch (error) {
      console.error('submit-comment-error', error)
      errorNotif('Submit Comment | Something went wrong')
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
      }}
    />
  )
}

export const useMainContext = () => useContext(MainContext);