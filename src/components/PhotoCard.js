import React from 'react';
import { Card, Typography } from 'antd';
import PropTypes from "prop-types";
import './PhotoCard.scss';

const { Text, Link } = Typography;

const PhotoCard = ({ 
  photoData, 
  userData,
  onClickUserInfo,
  onClickDetailPhoto
}) => {

  return (
    <Card
      className='container-photo-card'
      style={{ position: 'relative', width: 400, marginTop: 32 }}
      cover={
        <img
          onClick={onClickDetailPhoto}
          loading='lazy'
          alt={`photo-${photoData.id}`}
          src={photoData.url}
          className='cursor-pointer'
        />
      }
    >
      <div className='absolute-title'>
        <Text style={{ color: 'white', textTransform: 'capitalize' }}>
          {photoData.title}
        </Text>
      </div>

      <div className='flex-between-center pb-3' onClick={onClickUserInfo}>
        <Link style={{ textTransform: 'capitalize' }} ellipsis>
          {userData.name}
        </Link>
        <Link style={{ textTransform: 'capitalize' }} ellipsis>
          {userData.email}
        </Link>
      </div>

    </Card>
  )
}

PhotoCard.propTypes = {
  photoData: PropTypes.object,
  userData: PropTypes.object,
  onClickUserInfo: PropTypes.func,
  onClickDetailPhoto: PropTypes.func,
}

PhotoCard.defaultProps = {
  photoData: {},
  userData: {},
  onClickUserInfo: () => {},
  onClickDetailPhoto: () => {},
};

export default PhotoCard
