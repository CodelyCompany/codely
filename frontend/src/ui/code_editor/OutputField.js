import React from 'react';

const OutputField = ({ output }) => {
  return (
    <div
      style={{
        border: '3px solid rgb(25, 118, 210)',
        width: '82%',
        alignSelf: 'end',
        marginTop: '10px',
      }}
    >
      {output}
    </div>
  );
};

export default OutputField;
