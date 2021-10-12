import React, { useCallback, useState } from 'react';
import PropTypes from "prop-types";
import { Input } from 'antd';

const { Search } = Input;

const CommentBox = ({ handleSubmitComment }) => {
  const [typing, setTyping] = useState('');

  const onSubmit = (value) => {
    handleSubmitComment(value);
    setTyping('');
  }

  return (
    <div className='flex-between-center pt-3'>
      <Search
        onChange={(e) => setTyping(e.target.value)}
        value={typing}
        placeholder="Comment"
        allowClear
        enterButton="Comment"
        onPressEnter={(e) => onSubmit(e.target.value)}
        onSearch={onSubmit}
      />
    </div>
  )
}

CommentBox.propTypes = {
  handleSubmitComment: PropTypes.func,
}

CommentBox.defaultProps = {
  handleSubmitComment: () => {},
};

export default CommentBox
