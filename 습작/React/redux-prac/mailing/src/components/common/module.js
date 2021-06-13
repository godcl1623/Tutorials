/* eslint-disable prettier/prettier */
import React from 'react';

export const Select = ({ array, id, register, name }) => {
  const options = array.map((element, i) => <option key={i}>{element}</option>);
  return (
    <select id={id} {...register(name)}>
      {options}
    </select>
  );
};

export const Input = ({ id = '', type, register, name, isRequired = false }) => {
  if (isRequired) {
    <input
      id={id}
      type={type}
      {...register(name, { required: `${name}을 입력해 주세요` })}
    />;
  }
  return <input id={id} type={type} {...register(name)} />;
};

export const Label = ({ isFor, tag }) => {
  return (
    <label className={`${isFor}-header`} htmlFor={`${isFor}-input`}>
      {tag}
    </label>
  );
};

export const Checkbox = ({ id, type, register, name, isChecked, ref }) => {
  return <input id={id} type={type} {...register(name)} checked={isChecked} ref={ref} />;
};
