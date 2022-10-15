import React from 'react';
import { TextField } from '@mui/material';

const CodeField = () => {
  const style = {
    width: '80%',
  };

  return (
    <TextField
      sx={style}
      id='outlined-multiline-flexible'
      label='Code here'
      multiline
      rows={15}
      // value={2}
      // onChange={}
    />
  );
};

export default CodeField;
