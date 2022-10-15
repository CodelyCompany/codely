import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { DiJsBadge } from 'react-icons/di';
import { DiLinux } from 'react-icons/di';

const LanguageSelector = () => {
  const [language, setLanguage] = React.useState('JavaScript');

  const handleChange = (event) => {
    setLanguage(event.target.value);
  };

  const style = {
    marginRight: '5px',
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 180 }} size='small'>
      <InputLabel>Language</InputLabel>
      <Select
        labelId='demo-select-small'
        id='demo-select-small'
        value={language}
        label='Language'
        onChange={handleChange}
      >
        <MenuItem value={'JavaScript'}>
          {' '}
          <DiJsBadge style={style} /> JavaScript
        </MenuItem>
        <MenuItem value={'Bash'}>
          {' '}
          <DiLinux style={style} /> Bash
        </MenuItem>
      </Select>
    </FormControl>
  );
};

export default LanguageSelector;
