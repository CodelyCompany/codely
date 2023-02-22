import React, { useEffect, useState } from 'react';

import codeGif from 'styles/6iE3BC564u.gif';
import codeGifDarkTheme from 'styles/0082BUw8UC.gif';
import codeGifPinkTheme from 'styles/MKteEKMiiu.gif';

const MainPage = () => {
  const [theme, setTheme] = useState(0);

  useEffect(() => {
    setTheme(parseInt(localStorage.getItem('theme')) ?? 0);
  }, []);

  const getImage = () => {
    if (!theme) return codeGifPinkTheme;
    if (theme === 1) return codeGifDarkTheme;
    return codeGif;
  };

  return (
    <div className={`main-page-container main-theme-${theme}`}>
      <nav className='main-page'>
        <ul>
          <li>
            <a>Code</a>
            <div className={`border border-theme-${theme}`}></div>
          </li>
          <li>
            <a>Learn</a>
            <div className={`border border-theme-${theme}`}></div>
          </li>
          <li>
            <a>Train</a>
            <div className={`border border-theme-${theme}`}></div>
          </li>
          <li>
            <a>Compete</a>
            <div className={`border border-theme-${theme}`}></div>
          </li>
        </ul>
      </nav>
      <img src={getImage()} alt='gif with code' />
    </div>
  );
};
export default MainPage;
