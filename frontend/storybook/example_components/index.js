import React from 'react';

export const Button = ({ clickHandler, text }) => (
  <button onClick={clickHandler}>{text}</button>
);
