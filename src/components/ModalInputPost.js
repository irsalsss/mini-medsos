import React, { useEffect, useState } from 'react';
import { Input, Modal, Typography } from 'antd';
import PropTypes from "prop-types";

const { Text } = Typography;

const ModalInputPost = ({ isOpen, onSubmit, onClose, data, userData }) => {
  const [body, setBody] = useState({});

  const onChange = (e) => {
    const { name, value } = e.target;
    setBody((prev) => ({
      ...prev,
      [name]: value
    }))
  };

  const _onSubmit = async () => {
    await onSubmit(body);
    setBody({});
  }

  useEffect(() => {
    setBody(data);
  }, [data])

  return (
    <Modal 
      title="Modal Post" 
      visible={isOpen} 
      onOk={() => _onSubmit()} 
      onCancel={onClose}
      destroyOnClose={true}
    >
      <div className='pb-3'>
        <Text type="secondary">User:</Text>
        <Input
          key={data.id}
          name='user'
          value={userData?.name || ''}
          disabled={true}
        />
      </div>

      <div className='pb-3'>
        <Text type="secondary">Title:</Text>
        <Input
          key={data.id}
          name='title'
          defaultValue={data?.title || body?.title || ''}
          onChange={onChange}
        />
      </div>

      <div className='pb-3'>
        <Text type="secondary">Desc:</Text>
        <Input
          key={data.id}
          name='body'
          defaultValue={data?.body || body?.body || ''}
          onChange={onChange}
        />
      </div>
    </Modal>
  )
}

ModalInputPost.propTypes = {
  isOpen: PropTypes.bool,
  onSubmit: PropTypes.func,
  onClose: PropTypes.func,
  data: PropTypes.object,
  userData: PropTypes.object,
}

ModalInputPost.defaultProps = {
  isOpen: false,
  onSubmit: () => {},
  onClose: null,
  data: {},
  userData: {},
};

export default ModalInputPost
