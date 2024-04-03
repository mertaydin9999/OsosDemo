import React from "react";

const InputSearch = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  className,
}) => {
  return (
    <input
      className={className}
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default InputSearch;
