import React from 'react';

import { Box, Button } from '@mui/material';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getSocket } from '../../../ducks/socket/selectors';

const Buttons = ({ socket }) => {
  const { roomId } = useParams();

  const finishEx = () => {
    socket.emit('game-finished', roomId);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        margin: '10px 0',
      }}
    >
      <Button variant="contained">Run</Button>
      <Button variant="contained" onClick={finishEx}>
        Submit
      </Button>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  socket: getSocket(state),
});

export default connect(mapStateToProps)(Buttons);

Buttons.propTypes = {
  socket: PropTypes.object,
};
