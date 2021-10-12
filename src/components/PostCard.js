import React from 'react';
import { Typography, Card } from 'antd';
import PropTypes from "prop-types";
import CommentBox from './CommentBox';

const { Text, Link } = Typography;

const PostCard = ({ postData, onClick, comments, handleSubmitComment }) => {
  return (
    <Card
      hoverable
      style={{ width: 650 }}
    >
      {onClick && (
        <Link
          onClick={onClick}
          style={{ position: 'absolute', top: 16, right: 16 }}
        >
          View detail
        </Link>
      )}

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

      {comments.length > 0 && (
        <div className='pt-2 flex-column d-flex'>
          {comments.map((v) => (
            <div className='pt-2' key={v.id}>
              <Text strong>{v.email}</Text>
              <Text className='pl-2'>{v.body}</Text>
            </div>
          ))}
        </div>
      )}

      {handleSubmitComment && (
        <CommentBox handleSubmitComment={handleSubmitComment} />
      )}

    </Card>
  )
};

PostCard.propTypes = {
  postData: PropTypes.object,
  comments: PropTypes.array,
  onClick: PropTypes.func,
  handleSubmitComment: PropTypes.func,
}

PostCard.defaultProps = {
  postData: {},
  comments: [],
  onClick: null,
  handleSubmitComment: null,
};

export default PostCard
