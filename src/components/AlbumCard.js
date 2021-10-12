import React from 'react';
import { Typography, Card } from 'antd';
import './AlbumCard.scss';
import PropTypes from "prop-types";

const { Text, Link } = Typography;

const AlbumCard = ({ userData, albumData, onClickAlbum, onClickUser }) => {
  return (
    <Card
      hoverable
      style={{ width: 300 }}
    >
      <div className='wrapper-album'>
        <Text>Album title: </Text>
        <Link style={{ textTransform: 'capitalize' }} ellipsis onClick={onClickAlbum}>
          {albumData.title}
        </Link>
      </div>

      <div className='wrapper-user'>
        <Text>User name: </Text>
        <Link ellipsis onClick={onClickUser}>
          {userData?.name || `Detail User ${albumData.userId}`}
        </Link>
      </div>
    </Card>
  )
};

AlbumCard.propTypes = {
  userData: PropTypes.object,
  albumData: PropTypes.object,
  onClickAlbum: PropTypes.func,
  onClickUser: PropTypes.func,
}

AlbumCard.defaultProps = {
  userData: {},
  albumData: {},
  onClickAlbum: () => {},
  onClickUser: () => {},
};

export default AlbumCard
