import React, { useEffect, useMemo, useState } from 'react';

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
import { getToken } from 'ducks/token/selectors';
import { getUserByUsername } from 'ducks/user/selectors';
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
import GetToken from 'ui/user/GetToken';

const ExerciseDetail = ({ GetExercises, token }) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const exercise = useSelector(getExerciseById(id));
  const rating = useSelector(getRatingByExerciseId(id));
  const { user } = useAuth0();
  const foundUser = useSelector(getUserByUsername(user.nickname));
  const navigate = useNavigate();
  const [toDelete, setToDelete] = useState(false);
  const [argumentValues, setArgumentValues] = useState([]);
  const color = useMemo(
    () =>
      parseInt(localStorage.getItem('theme') ?? 0) === 2
        ? 'secondary.main'
        : 'primary.main',
    [localStorage.getItem('theme')]
  );
  useEffect(() => {
    if (_.isEmpty(exercise)) {
      GetExercises(token);
    }
  }, [token]);

  return (
    exercise && (
      <>
        <GetToken />
        <Container sx={{ marginTop: '10px' }}>
          <Box id='exercise-wrapper'>
            <List
              className={`theme-${foundUser.theme}`}
              sx={{
                width: '100%',
                height: '100%',
                bgcolor: 'background.paper',
              }}
            >
              <ListItem>
                <Typography
                  variant='h3'
                  sx={{
                    borderColor: color,
                    borderBottom: '3px solid',
                    color,
                  }}
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
                  primary={t('Programming Language')}
                  secondary={exercise.programmingLanguage}
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
                  primary={t('Difficulty')}
                  secondary={[...Array(exercise.difficulty).keys()].map(
                    (el) => (
                      <StarRateIcon sx={{ color: 'gold' }} key={el} />
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
                  secondary={
                    rating
                      ? [...Array(Math.round(rating)).keys()].map((num) => (
                          <StarRateIcon
                            sx={{ color: 'gold' }}
                            key={`rating-${num}`}
                          />
                        ))
                      : t('no reviews')
                  }
                />
              </ListItem>
            </List>

            {user.nickname === exercise.author.username && (
              <Box
                id='manage-exercise'
              >
                <Button
                  color={color.split('.')[0]}
                  variant='contained'
                  sx={{ height: '40px', marginTop: '50px', width: '100px' }}
                  onClick={() => {
                    setToDelete(true);
                  }}
                >
                  {t('Delete')}
                </Button>
                <Button
                  color={color.split('.')[0]}
                  variant='contained'
                  sx={{ height: '40px', marginTop: '10px', width: '100px' }}
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

const mapStateToProps = (state) => ({
  token: getToken(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseDetail);

ExerciseDetail.propTypes = {
  GetExercises: PropTypes.func.isRequired,
  token: PropTypes.string,
};
