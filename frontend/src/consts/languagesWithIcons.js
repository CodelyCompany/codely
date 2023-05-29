import React from 'react';

import { DiJsBadge } from 'react-icons/di';
import { DiLinux } from 'react-icons/di';
import { FaJava, FaPython } from 'react-icons/fa';
import { SiC, SiCplusplus, SiR } from 'react-icons/si';

import ProgrammingLanguage from './programmingLanguage';

const languagesWithIcons = {
  [ProgrammingLanguage.JAVASCRIPT]: <DiJsBadge className='language-icon' />,
  [ProgrammingLanguage.BASH]: <DiLinux className='language-icon' />,
  [ProgrammingLanguage.C]: <SiC className='language-icon' />,
  [ProgrammingLanguage.CPP]: <SiCplusplus className='language-icon' />,
  [ProgrammingLanguage.JAVA]: <FaJava className='language-icon' />,
  [ProgrammingLanguage.PYTHON]: <FaPython className='language-icon' />,
  [ProgrammingLanguage.R]: <SiR className='language-icon' />,
};

export default languagesWithIcons;
