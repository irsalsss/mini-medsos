import React from 'react';
import { Card, Typography } from 'antd';
import './PhotoCard.scss';

const { Text, Link } = Typography;

const PhotoCard = ({ 
  photoData, 
  onClickUserInfo, 
  userData,
}) => {

  return (
    <Card
      className='container-photo-card'
      style={{ position: 'relative', width: 400, marginTop: 32 }}
      cover={
        <img
          loading='lazy'
          alt={`photo-${photoData.id}`}
          src={photoData.url}
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

export default PhotoCard
