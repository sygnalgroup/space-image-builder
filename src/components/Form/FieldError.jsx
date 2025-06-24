import React from 'react';

export const FieldError = ({ errors }) => {
  return <p className="text-sm text-red-500">{errors}</p>;
};
