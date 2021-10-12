import React from 'react';
import PropTypes from "prop-types";
import { Radio } from 'antd';

const RadioGroup = ({ options, onChange, value }) => {
  return (
    <Radio.Group onChange={onChange} value={value}>
      {options.map((v) => (
        <Radio key={v.value} value={v.value}>{v.label}</Radio>
      ))}
    </Radio.Group>
  )
}

RadioGroup.propTypes = {
  options: PropTypes.array,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
}

RadioGroup.defaultProps = {
  options: [],
  onChange: () => {},
  value: null,
};

export default RadioGroup
