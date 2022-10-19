import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { DiJsBadge } from 'react-icons/di';
import { DiLinux } from 'react-icons/di';
import { FaJava, FaPython } from 'react-icons/fa';
import { SiCplusplus, SiC, SiR } from 'react-icons/si';

const LanguageSelector = ({ language, setLanguage }) => {
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
    <FormControl sx={{ m: 1, minWidth: 180, color: 'blue' }} size='small'>
      <InputLabel>Language</InputLabel>
      <Select
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
