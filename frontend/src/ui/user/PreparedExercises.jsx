import * as React from 'react';

import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { PropTypes } from 'prop-types';
import { FixedSizeList } from 'react-window';

function renderRow(props) {
  const { index, style } = props;

  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton>
        <ListItemText primary={'index'} />
      </ListItemButton>
    </ListItem>
  );
}

function PreparedExercises({ exercises }) {
  return (
    <Box
      sx={{
        width: '100%',
        height: 250,
        bgcolor: 'background.paper',
        borderBottom: '3px solid rgb(25, 118, 210)',
      }}
    >
      <Typography variant="h6" color="primary" sx={{ fontWeight: 'bolder' }}>
        Your prepared exercises:{' '}
      </Typography>
      <FixedSizeList
        height={200}
        itemSize={46}
        itemCount={exercises.length}
        overscanCount={5}
      >
        {renderRow}
      </FixedSizeList>
    </Box>
  );
}

export default PreparedExercises;

PreparedExercises.propTypes = {
  exercises: PropTypes.array.isRequired,
};
