import React from 'react';

export const Title = ({ type, register, name, tag = '', id = '' }) => {
  return <input id={id} type={type} {...register(name)} placeholder={tag} />;
};

export const Contents = ({ register, name, tag, id = '' }) => {
  return <textarea id={id} {...register(name)} placeholder={tag} />;
};
