import React, { useState } from 'react';
import { Input, Modal } from 'antd';
import PropTypes from "prop-types";

const ModalUpdateComment = ({ isOpen, onSubmit, onClose, data }) => {
  const [comment, setComment] = useState('');

  return (
    <Modal 
      title="Modal Update Comment" 
      visible={isOpen} 
      onOk={() => onSubmit(data, comment)} 
      onCancel={onClose}
    >
      <Input
        key={data.id}
        defaultValue={data.body} 
        onChange={(e) => setComment(e.target.value)}
      />
    </Modal>
  )
}

ModalUpdateComment.propTypes = {
  isOpen: PropTypes.bool,
  onSubmit: PropTypes.func,
  onClose: PropTypes.func,
  data: PropTypes.object,
}

ModalUpdateComment.defaultProps = {
  isOpen: false,
  onSubmit: () => {},
  onClose: null,
  data: {},
};

export default ModalUpdateComment
