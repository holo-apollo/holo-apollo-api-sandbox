import React from 'react';

export const Button = ({ clickHandler, children }) => (
  <button onClick={clickHandler}>{children}</button>
);
