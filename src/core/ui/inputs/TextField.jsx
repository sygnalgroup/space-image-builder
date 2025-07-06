import React from 'react';

const TextField = ({
  label,
  placeholder,
  value,
  onChange,
  name,
  type = 'text',
  className = '',
  ...props
}) => (
  <div className="h-14 rounded-lg border px-3 py-2">
    {label && (
      <label className="block text-xs text-gray-500" htmlFor={name}>
        {label}
      </label>
    )}
    <input
      id={name}
      name={name}
      type={type}
      className={`border-none outline-none ${className} w-full`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...props}
    />
  </div>
);

export default TextField;
