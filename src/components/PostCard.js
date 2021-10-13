import React from 'react';
import { Typography, Card } from 'antd';
import PropTypes from "prop-types";
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import CommentBox from './CommentBox';
import './PostCard.scss';

const { Text, Link } = Typography;

const PostCard = ({ 
  postData, 
  comments,
  onClick, onClickDelete, onClickEdit,
  onSubmitComment, onUpdateComment, onDeleteComment 
}) => {
  return (
    <Card
      hoverable
      className='container-post-card'
    >
      <div className='container-action'>
        {onClick && (
          <Link onClick={onClick}>
            View detail
          </Link>
        )}

        {onClickEdit && (
          <Link className='pl-3' onClick={onClickEdit}>
            Edit
          </Link>
        )}

        {onClickDelete && (
          <Link className='pl-3' onClick={onClickDelete}>
            Delete
          </Link>
        )}
      </div>

      <div className='flex-column d-flex'>
        <Text type="secondary">Post title: </Text>
        <Text style={{ textTransform: 'capitalize' }} ellipsis>
          {postData.title}
        </Text>
      </div>

      <div className='pt-2 flex-column d-flex'>
        <Text type="secondary">Post desc: </Text>
        <Text className='ellipsis-2-row'>
          {postData.body}
        </Text>
      </div>

      {comments.length > 0 && (
        <div className='pt-2 flex-column d-flex'>
          {comments.map((v) => (
            <div className='pt-2 pr-6 position-r inline-comment' key={v.id}>
              <Text strong>{v.email}</Text>
              <Text className='pl-2'>{v.body}</Text>

              {v.email === 'irsal@hehehe.com' && (
                <div className='comment-action'>
                  <EditOutlined 
                    onClick={() => onUpdateComment(v)}
                    style={{ cursor: 'pointer', paddingRight: 8 }} 
                  />
                  <DeleteOutlined 
                    onClick={() => onDeleteComment(v)}
                    style={{ cursor: 'pointer' }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {onSubmitComment && (
        <CommentBox handleSubmitComment={onSubmitComment} />
      )}

    </Card>
  )
};

PostCard.propTypes = {
  postData: PropTypes.object,
  comments: PropTypes.array,
  onClick: PropTypes.func,
  onClickDelete: PropTypes.func,
  onClickEdit: PropTypes.func,
  onSubmitComment: PropTypes.func,
  onUpdateComment: PropTypes.func,
  onDeleteComment: PropTypes.func,
}

PostCard.defaultProps = {
  postData: {},
  comments: [],
  onClick: null,
  onClickDelete: null,
  onClickEdit: null,
  onSubmitComment: null,
  onUpdateComment: () => {},
  onDeleteComment: () => {},
};

export default PostCard
