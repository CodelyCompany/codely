import * as React from 'react';

import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { PropTypes } from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { FixedSizeList } from 'react-window';

import PreparedExercisesChart from './PreparedExercisesChart';

function UserExercisesList({ exercises, mode }) {
  const navigate = useNavigate();

  function renderRow(props) {
    const { index, style } = props;

    return (
      <ListItem style={style} key={index} component='div' disablePadding>
        <ListItemButton
          onClick={() => navigate(`/exercise/${exercises[index]._id}`)}
        >
          <ListItemText
            sx={{ color: 'rgb(25, 118, 210)' }}
            primary={
              <div>
                <LabelImportantIcon sx={{ position: 'relative', top: '6px' }} />{' '}
                {exercises[index].title}
              </div>
            }
          />
        </ListItemButton>
      </ListItem>
    );
  }

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        bgcolor: 'background.paper',
        borderBottom: '3px solid rgb(25, 118, 210)',
        display: 'flex',
        flexDirection: 'column',
        // alignItems: 'center',
      }}
    >
      <Typography variant='h6' color='primary' sx={{ fontWeight: 'bolder' }}>
        {mode === 'prepared' ? 'Your prepared exercises:' : 'Done exercises:'}
      </Typography>
      <FixedSizeList
        height={100}
        itemSize={46}
        itemCount={exercises.length}
        overscanCount={5}
      >
        {renderRow}
      </FixedSizeList>
      {mode === 'prepared' && (
        <PreparedExercisesChart exercises={exercises} mode='prepared' />
      )}
      {mode === 'done' && (
        <PreparedExercisesChart exercises={exercises} mode='done' />
      )}
    </Box>
  );
}

export default UserExercisesList;

UserExercisesList.propTypes = {
  exercises: PropTypes.array.isRequired,
  index: PropTypes.number,
  style: PropTypes.object,
  mode: PropTypes.string.isRequired,
};
