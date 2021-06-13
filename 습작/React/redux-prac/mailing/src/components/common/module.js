import React from 'react';

export const Select = ({ array, id, register, name, value }) => {
  const options = array.map((element, i) => <option key={i}>{element}</option>);
  const selectValue = value === undefined ? '' : value;
  return (
    <select id={id} {...register(name)} value={selectValue}>
      {options}
    </select>
  );
};

export const Input = ({ id = '', type, register, name, value, isRequired = false }) => {
  const inputValue = value === undefined ? '' : 'test';
  if (isRequired) {
    <input
      id={id}
      type={type}
      {...register(name, { required: `${name}을 입력해 주세요` })}
      value={inputValue}
    />;
  }
  return <input id={id} type={type} {...register(name)} value={inputValue} />;
};

export const Label = ({ isFor, tag }) => {
  return (
    <label className={`${isFor}-header`} htmlFor={`${isFor}-input`}>
      {tag}
    </label>
  );
};

export const Checkbox = ({ id, type, register, name, value }) => {
  const cbValue = value === undefined ? '' : value;
  return <input id={id} type={type} {...register(name)} value={cbValue} />;
};
