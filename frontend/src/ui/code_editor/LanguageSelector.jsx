import React from 'react';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import useTheme from 'helpers/useTheme';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { DiJsBadge } from 'react-icons/di';
import { DiLinux } from 'react-icons/di';
import { FaJava, FaPython } from 'react-icons/fa';
import { SiC, SiCplusplus, SiR } from 'react-icons/si';

const LanguageSelector = ({ language, setLanguage }) => {
  const { t } = useTranslation();
  const { color } = useTheme();

  const style = {
    marginRight: '5px',
  };

  const languagesWithIcons = [
    {
      lang: 'JavaScript',
      icon: <DiJsBadge style={style} />,
    },
    {
      lang: 'Bash',
      icon: <DiLinux style={style} />,
    },
    {
      lang: 'C',
      icon: <SiC style={style} />,
    },
    {
      lang: 'C++',
      icon: <SiCplusplus style={style} />,
    },
    {
      lang: 'Java',
      icon: <FaJava style={style} />,
    },
    {
      lang: 'Python',
      icon: <FaPython style={style} />,
    },
    {
      lang: 'R',
      icon: <SiR style={style} />,
    },
  ];

  const handleChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <FormControl id='language-selector-form' sx={{ color }} size='small'>
      <InputLabel sx={{ color }}>{t('Language')}</InputLabel>
      <Select
        sx={{ color }}
        labelId='demo-select-small'
        id='demo-select-small'
        value={language}
        label='Language'
        onChange={handleChange}
      >
        {languagesWithIcons.map((el) => (
          <MenuItem key={el.lang} value={el.lang}>
            {el.icon} {el.lang}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default LanguageSelector;

LanguageSelector.propTypes = {
  language: PropTypes.string.isRequired,
  setLanguage: PropTypes.func.isRequired,
};
