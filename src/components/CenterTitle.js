import React from 'react';
import { Typography } from 'antd';
import PropTypes from "prop-types";

const { Text } = Typography;

const CenterTitle = ({ title }) => {
  return (
    <div className='mt-2 d-flex justify-center'>
      <Text strong className='pb-3'>{title}</Text>
    </div>
  )
}

CenterTitle.propTypes = {
  title: PropTypes.string,
}

CenterTitle.defaultProps = {
  title: '',
};

export default CenterTitle
