import React from 'react';

import codeGif from '../styles/6iE3BC564u.gif';
import mainImage from '../styles/main-page.png';

const MainPage = () => (
  <div className="main-page-container">
    <nav className="main-page">
      <img src={mainImage} alt="crossword with codely" />
    </nav>
    <div className="right-panel">
      <a>Just code!</a>
      <img src={codeGif} alt="gif with code" />
    </div>
  </div>
);

export default MainPage;
