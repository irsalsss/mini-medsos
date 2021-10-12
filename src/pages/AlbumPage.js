import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useHistory } from "react-router-dom";

import { getPhotosByAlbumId } from '../client/MainApi';
import PhotoCard from '../components/PhotoCard';
import { useMainContext } from '../context/MainContext';

const AlbumPage = () => {
  const history = useHistory();
  const { albumId } = useParams();
  const { users, albums } = useMainContext();
  const [photos, setPhotos] = useState([]);

  const userIndex = Math.floor((albumId - 1) / 10);

  const _getPhotos = async() => {
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

  useEffect(() => {
    _getPhotos();
  }, []);

  return (
    <div className='container-album-page d-flex flex-wrap flex-column items-center'>
      {users && albums && photos && photos.map((v) => (
        <PhotoCard
          key={v.id}
          photoData={v}
          userData={users[userIndex]}
          onClickUserInfo={() => history.push(`/user/${users[userIndex].id}`)}
        />
      ))}
    </div>
  )
}

export default AlbumPage
