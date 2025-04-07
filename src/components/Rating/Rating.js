import React from 'react';

import { Rate } from 'antd';

function Rating({ value, onChange }) {
  return (
    <Rate
      allowHalf
      defaultValue={value}
      count={10}
      style={{ fontSize: window.innerWidth < 768 ? '13px' : '17px' }}
      onChange={onChange}
    />
  );
}

export default Rating;
