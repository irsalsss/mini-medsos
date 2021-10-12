import React, { useMemo } from 'react';
import { Select } from 'antd';
import PropTypes from "prop-types";

const { Option } = Select;

const InputSelect = ({ defaultValue, options, onChange, unique }) => {

  return (
    <Select 
      placeholder='Please select the user name'
      className='mr-3'
      style={{ width: 300 }} 
      onChange={onChange}
      defaultValue={defaultValue}
    >
      {options.map((v) => (
        <Option 
          key={v.id} 
          value={unique ? v[unique] : v.value || v.name}
        >
          {v.value || v.name}
        </Option>
      ))}
    </Select>
  )
}

InputSelect.propTypes = {
  unique: PropTypes.string,
  defaultValue: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  options: PropTypes.array,
  onChange: PropTypes.func,
}

InputSelect.defaultProps = {
  unique: '',
  defaultValue: null,
  options: [],
  onChange: () => {},
};

export default InputSelect
