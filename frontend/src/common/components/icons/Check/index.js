import React from 'react';

import SVGIcon from '../SVGIcon';

const Check = ({ height, color }) => (
  <SVGIcon
    vBox={{
      minX: 0,
      minY: 0,
      width: 17,
      height: 13
    }}
    height={height}
    color={color}
  >
    <path d="M4.76,12.39a2.1,2.1,0,0,0,1.5.62,2.19,2.19,0,0,0,1.5-.62l8.62-8.74a2.14,2.14,0,0,0,0-3,2.08,2.08,0,0,0-3,0L6.26,7.85,3.6,5.15a2.08,2.08,0,0,0-3,0,2.14,2.14,0,0,0,0,3Z"/>
  </SVGIcon>
);

Check.defaultProps = {
  color: '#07bce9'
};

export default Check;
