import React from 'react';

import { Alert } from 'antd';

function ShowAlert({ message, type = 'error' }) {
  if (!message) return null;

  return (
    <div
      style={{ maxWidth: '600px', margin: '50px auto', textAlign: 'center' }}
    >
      <Alert message={message} type={type} showIcon />
    </div>
  );
}

export default ShowAlert;
