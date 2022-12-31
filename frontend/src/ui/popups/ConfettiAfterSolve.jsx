import React from 'react';

import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';

const ConfettiAfterSolve = () => {
  const { width, height } = useWindowSize();
  return (
    <Confetti
      style={{ position: 'fixed', top: '0px' }}
      width={width}
      height={height}
    />
  );
};

export default ConfettiAfterSolve;
