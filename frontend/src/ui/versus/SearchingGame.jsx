import React from 'react';

import { MutatingDots } from 'react-loader-spinner';

const SearchingGame = () => (
  <MutatingDots
    height="100"
    width="100"
    color="rgb(25, 118, 210)"
    secondaryColor="rgb(25, 118, 210)"
    radius="12.5"
    ariaLabel="mutating-dots-loading"
    wrapperStyle={{ justifyContent: 'center' }}
    wrapperClass=""
    visible={true}
  />
);

export default SearchingGame;
