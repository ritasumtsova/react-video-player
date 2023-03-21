import React from 'react';

export const Button = ({
  className = 'button',
  type = 'button',
  disabled,
  clickHandler,
  label,
}) => {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={clickHandler}
      className={className}
    >
      {label}
    </button>
  );
};
