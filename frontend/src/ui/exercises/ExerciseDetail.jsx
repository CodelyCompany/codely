import React, { useEffect, useState } from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import PersonIcon from '@mui/icons-material/Person';
import PsychologyIcon from '@mui/icons-material/Psychology';
import StarRateIcon from '@mui/icons-material/StarRate';
import { Box, Container, Typography } from '@mui/material';
import { Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import { DeleteExercise, GetExercises } from 'ducks/exercises/operations';
import { getExerciseById } from 'ducks/exercises/selectors';
import { getRatingByExerciseId } from 'ducks/reviews/selectors';
import { getUserByUsername } from 'ducks/user/selectors';
import usePageTitle from 'helpers/usePageTitle';
import useTheme from 'helpers/useTheme';
import useToken from 'helpers/useToken';
import * as _ from 'lodash';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import EditorField from 'ui/exercises/editor_to_exercises/EditorField';
import Reviews from 'ui/exercises/reviews/Reviews';
import Confirmation from 'ui/popups/Confirmation';

import Pages from 'consts/pages';
import ProgrammingLanguage from 'consts/programmingLanguage';

const ExerciseDetail = ({ GetExercises }) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { token } = useToken();
  const exercise = useSelector(getExerciseById(id));
  const rating = useSelector(getRatingByExerciseId(id));
  const { user } = useAuth0();
  const foundUser = useSelector(getUserByUsername(user.nickname));
  const navigate = useNavigate();
  const [toDelete, setToDelete] = useState(false);
  const [argumentValues, setArgumentValues] = useState([]);
  const { color, theme } = useTheme();
  const exerciseLanguage =
    ProgrammingLanguage[exercise?.programmingLanguage.toUpperCase()];
  usePageTitle(Pages.EXERCISE);

  useEffect(() => {
    if (_.isEmpty(exercise)) {
      GetExercises(token);
    }
  }, [token]);

  return (
    exercise && (
      <>
        <Container id='exercise-details-container'>
          <Box id='exercise-wrapper'>
            <List
              id='exercise-info-list'
              className={`theme-${foundUser.theme}`}
              sx={{ bgcolor: 'background.paper' }}
            >
              <ListItem>
                <Typography
                  id='exercise-title'
                  variant='h3'
                  sx={{ borderColor: color, color }}
                >
                  {exercise.title}
                </Typography>
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      backgroundColor: color,
                    }}
                  >
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  id={'author'}
                  primary={t('Author')}
                  secondary={exercise.author.username}
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      backgroundColor: color,
                    }}
                  >
                    <GTranslateIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  id={'language'}
                  primary={t('Programming Language')}
                  secondary={exerciseLanguage}
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      backgroundColor: color,
                    }}
                  >
                    <PsychologyIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  id={'difficulty'}
                  primary={t('Difficulty')}
                  secondary={[...Array(exercise.difficulty).keys()].map(
                    (el) => (
                      <StarRateIcon className='exercise-star-icon' key={el} />
                    )
                  )}
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      backgroundColor: color,
                    }}
                  >
                    <FormatColorTextIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  id={'description'}
                  primary={t('Description')}
                  secondary={exercise.description}
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ backgroundColor: color }}>
                    <StarRateIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={t('Rating')}
                  id={'rating'}
                  secondary={
                    rating
                      ? [...Array(Math.round(rating)).keys()].map((num) => (
                          <StarRateIcon
                            className='exercise-star-icon'
                            key={`rating-${num}`}
                          />
                        ))
                      : t('no reviews')
                  }
                />
              </ListItem>
            </List>

            {user.nickname === exercise.author.username && (
              <Box id='manage-exercise'>
                <Button
                  color={theme}
                  variant='contained'
                  onClick={() => {
                    setToDelete(true);
                  }}
                >
                  {t('Delete')}
                </Button>
                <Button
                  color={theme}
                  variant='contained'
                  onClick={() => navigate(`/exercises/edit/${id}`)}
                >
                  {t('Edit')}
                </Button>
              </Box>
            )}
          </Box>
          <Box>
            <EditorField
              functionName={exercise.functionName}
              argumentValues={argumentValues}
              setArgumentValues={setArgumentValues}
              args={exercise.argumentsName}
              language={exercise.programmingLanguage}
              functionSignature={exercise.functionSignature}
            />
          </Box>
          <Box>
            <Reviews />
          </Box>
        </Container>
        <Confirmation open={toDelete} setOpen={setToDelete} />
      </>
    )
  );
};

const mapDispatchToProps = {
  GetExercises,
  DeleteExercise,
};

export default connect(null, mapDispatchToProps)(ExerciseDetail);

ExerciseDetail.propTypes = {
  GetExercises: PropTypes.func.isRequired,
};
