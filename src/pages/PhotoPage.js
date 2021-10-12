import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";

import PhotoCard from '../components/PhotoCard'
import { useMainContext } from '../context/MainContext';
import { urlToParams } from '../utils/Utils';

const PhotoPage = () => {
  const location = useLocation();
  const [photoData, setPhotoData] = useState([]);
  const { users, photos, _getPhotosByAlbumId } = useMainContext();
  const { userId, albumId, photoId } = urlToParams(location.search);

  useEffect(() => {
    _getPhotosByAlbumId(albumId);
  }, []);

  useEffect(() => {
    if (photos.length) {
      setPhotoData(photos.filter((v) => v.id == photoId))
    }
  }, [photos])

  return (
    <div className='contianer-detail-photo d-flex flex-wrap flex-column items-center'>
      {users && photos && photoData && (
        <PhotoCard
          photoData={photoData[0]}
          userData={users[userId]}
          onClickUserInfo={() => history.push(`/user/${users[userId].id}`)}
        />
      )}
    </div>
  )
}

export default PhotoPage
