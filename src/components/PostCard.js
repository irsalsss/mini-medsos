import React from 'react';
import { Typography, Card } from 'antd';
import PropTypes from "prop-types";

const { Text, Link } = Typography;

const PostCard = ({ postData, onClick }) => {
  return (
    <Card
      hoverable
      style={{ width: 650 }}
    >
      <Link
        onClick={onClick}
        style={{ position: 'absolute', top: 16, right: 16 }}
      >
        View detail
      </Link>
      <div className='flex-column d-flex'>
        <Text type="secondary">Post title: </Text>
        <Text style={{ textTransform: 'capitalize' }} ellipsis>
          {postData.title}
        </Text>
      </div>

      <div className='pt-2 flex-column d-flex'>
        <Text type="secondary">Post desc: </Text>
        <Text ellipsis>
          {postData.body}
        </Text>
      </div>
    </Card>
  )
};

PostCard.propTypes = {
  postData: PropTypes.object,
  onClick: PropTypes.func,
}

PostCard.defaultProps = {
  postData: {},
  onClick: () => {},
};

export default PostCard
