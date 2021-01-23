import React from 'react';
import { Avatar as AntAvatar, Image } from 'antd';

function Avatar({ name, className, color, size = 'default' }) {
  const urlPrefix = `${process.env.PUBLIC_URL}/images/members/`;
  return (
    <AntAvatar
      size={size}
      style={color && { border: `2px solid ${color}` }}
      src={
        <Image
          src={`${urlPrefix}${name.toLowerCase()}.jpg`}
          fallback={`${urlPrefix}none.jpg`}
          alt={name}
          className={className}
        />
      }
    />
  );
}

export default Avatar;
