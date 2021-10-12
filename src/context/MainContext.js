import React, { useState, useEffect, useContext, createContext } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { getAlbumsByUserId, getPostsByUserId, getUsers } from '../client/MainApi';
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
  const [posts, setPosts] = useState([]);


  const handleActiveNavbar = (e) => {
    setActiveNavbar(e.key);
    history.push(`/${e.key}`);
  }

  const onClickCard = (type, id, data) => {
    history.push(`/${type}/${id}`);
    setActiveNavbar(type);
  }

  const onChangeFilterOption = (e) => {
    setFilterOption(e.target.value)
  }

  const onChangeActiveUser = (value) => {
    console.log('value', value)
    setActiveUser(value);
  }

  const _getAlbumsByUserId = async() => {
    try {
      const { data } = await getAlbumsByUserId(activeUser);
      if (data.length) {
        setAlbums(data);
      }
    } catch (error) {
      console.error('albums-error', error)
      errorNotif('Albums | Something went wrong')
    }
  }

  const _getPostsByUserId = async() => {
    try {
      const { data } = await getPostsByUserId(activeUser);
      if (data.length) {
        setPosts(data);
      }
    } catch (error) {
      console.error('posts-error', error)
      errorNotif('Posts | Something went wrong')
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

  useEffect(() => {
    const curr = pathname === '/' ? 'main' : pathname.replace('/', '');
    setActiveNavbar(curr);
    _getUsers();
  }, [])
  
  return (
    <MainContext.Provider 
      {...props}
      value={{
        users, albums, posts,
        activeUser,
        activeNavbar, handleActiveNavbar,
        filterOption, onChangeFilterOption,
        onClickCard,
        onChangeActiveUser,
        _getAlbumsByUserId, _getPostsByUserId
      }}
    />
  )
}

export const useMainContext = () => useContext(MainContext);