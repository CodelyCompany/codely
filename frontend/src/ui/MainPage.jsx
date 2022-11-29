import React from 'react';

import codeGif from '../styles/6iE3BC564u.gif';

const MainPage = () => (
  <div className='main-page-container'>
    <nav className='main-page'>
      <ul>
        <li>
          <a>Code</a>
          <div className='border'></div>
        </li>
        <li>
          <a>Learn</a>
          <div className='border'></div>
        </li>
        <li>
          <a>Train</a>
          <div className='border'></div>
        </li>
        <li>
          <a>Compete</a>
          <div className='border'></div>
        </li>
      </ul>
    </nav>
    <img src={codeGif} alt='gif with code' />
  </div>
);

export default MainPage;
