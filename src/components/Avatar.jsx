import React from 'react';
import { Avatar as AntAvatar, Image } from 'antd';
import { IMAGE_URL } from '../utils/constants';

function Avatar({ name, className, color, size = 'default' }) {
  return (
    <AntAvatar
      size={size}
      style={color && { border: `2px solid ${color}` }}
      src={
        <Image
          src={`${IMAGE_URL.AVATAR}${name.toLowerCase()}.jpg`}
          fallback={`${IMAGE_URL.AVATAR}none.jpg`}
          alt={name}
          className={className}
        />
      }
    />
  );
}

export default Avatar;
