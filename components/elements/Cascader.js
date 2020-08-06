import React from 'react';
import RMCascader from 'rmc-cascader';

export default function Cascader({ data }) {
  function onChange(value) {
    console.log('onChange', value);
  }
  return <RMCascader data={data} onChange={onChange} />;
}
