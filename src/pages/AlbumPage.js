import React, { useEffect } from 'react';
import { useParams } from 'react-router';

import PhotoCard from '../components/PhotoCard';
import { useMainContext } from '../context/MainContext';

const AlbumPage = () => {
  const { albumId } = useParams();
  const { users, albums, photos, _getPhotosByAlbumId, onRedirect } = useMainContext();

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
          onClickUserInfo={() => onRedirect(`/user/${users[userIndex].id}`)}
          onClickDetailPhoto={() => onRedirect(`/photo?userId=${users[userIndex].id}&albumId=${v.albumId}&photoId=${v.id}`)}
        />
      ))}
    </div>
  )
}

export default AlbumPage
