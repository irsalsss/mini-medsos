import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useHistory } from "react-router-dom";

import PhotoCard from '../components/PhotoCard';
import { useMainContext } from '../context/MainContext';

const AlbumPage = () => {
  const history = useHistory();
  const { albumId } = useParams();
  const { users, albums, photos, _getPhotosByAlbumId } = useMainContext();

  const userIndex = Math.floor((albumId - 1) / 10);

  useEffect(() => {
    _getPhotosByAlbumId(albumId);
  }, []);

  return (
    <div className='container-album-page d-flex flex-wrap flex-column items-center'>
      {users && albums && photos && photos.map((v) => (
        <PhotoCard
          key={v.id}
          photoData={v}
          userData={users[userIndex]}
          onClickUserInfo={() => history.push(`/user/${users[userIndex].id}`)}
          onClickDetailPhoto={() => history.push(`/photo?userId=${users[userIndex].id}&albumId=${v.albumId}&photoId=${v.id}`)}
        />
      ))}
    </div>
  )
}

export default AlbumPage
