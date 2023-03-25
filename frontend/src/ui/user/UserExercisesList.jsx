import React from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { getUserByUsername } from 'ducks/user/selectors';
import useTheme from 'helpers/useTheme';
import { PropTypes } from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FixedSizeList } from 'react-window';
import PreparedExercisesChart from 'ui/user/PreparedExercisesChart';

function UserExercisesList({ exercises, mode }) {
  const { t } = useTranslation();
  const { color } = useTheme();
  const navigate = useNavigate();
  const { user } = useAuth0();
  const foundUser = useSelector(getUserByUsername(user.nickname));

  function renderRow(props) {
    const { index, style } = props;

    return (
      <ListItem style={style} key={index} component='div' disablePadding>
        <ListItemButton
          onClick={() => navigate(`/exercise/${exercises[index]._id}`)}
        >
          <ListItemText
            sx={{ color }}
            primary={
              <div>
                <LabelImportantIcon id='label-icon' />
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
      className={`theme-${foundUser.theme} user-exercises-list`}
      sx={{ bgcolor: 'background.paper', borderColor: color }}
    >
      <Typography variant='h6' sx={{ color }}>
        {mode === 'prepared'
          ? t('Your prepared exercises:')
          : t('Done exercises:')}
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
