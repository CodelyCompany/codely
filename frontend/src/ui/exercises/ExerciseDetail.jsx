import React, { useEffect } from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import PersonIcon from '@mui/icons-material/Person';
import PsychologyIcon from '@mui/icons-material/Psychology';
import StarRateIcon from '@mui/icons-material/StarRate';
import { Box, Container, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import * as _ from 'lodash';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import { GetExercises } from '../../ducks/exercises/operations';
import { getExerciseById } from '../../ducks/exercises/selectors';

import EditorField from './editor_to_exercises/EditorField';
import Reviews from './reviews/Reviews';

const ExerciseDetail = ({ GetExercises }) => {
  const { id } = useParams();
  const exercise = useSelector((state) => getExerciseById(state, id));
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    if (_.isEmpty(exercise)) {
      (async () => {
        const token = await getAccessTokenSilently({
          audience: `${
            process.env.REACT_APP_BACKEND || 'http://localhost:5000'
          }`,
        });
        await GetExercises(token);
      })();
    }
  }, []);

  return (
    exercise && (
      <Container sx={{ marginTop: '10px' }}>
        <Box sx={{ width: '100%' }}>
          <List
            sx={{
              width: '100%',
              height: '100%',
              bgcolor: 'background.paper',
            }}
          >
            <ListItem>
              <Typography
                variant='h3'
                color='primary'
                sx={{ borderBottom: '3px solid rgb(25, 118, 210)' }}
              >
                {exercise.title}
              </Typography>
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: 'rgb(25, 118, 210)' }}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary='Author'
                secondary={exercise.author.username}
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: 'rgb(25, 118, 210)' }}>
                  <GTranslateIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary='Programming Language'
                secondary={exercise.programmingLanguage}
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: 'rgb(25, 118, 210)' }}>
                  <PsychologyIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary='Difficulty'
                secondary={[...Array(exercise.difficulty).keys()].map((el) => (
                  <StarRateIcon sx={{ color: 'gold' }} key={el} />
                ))}
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: 'rgb(25, 118, 210)' }}>
                  <FormatColorTextIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary='Description'
                secondary={exercise.description}
              />
            </ListItem>
          </List>
        </Box>
        <Box>
          <EditorField language={exercise.programmingLanguage} />
        </Box>
        <Box>
          <Reviews />
        </Box>
      </Container>
    )
  );
};

const mapDispatchToProps = {
  GetExercises,
};

export default connect(null, mapDispatchToProps)(ExerciseDetail);

ExerciseDetail.propTypes = {
  GetExercises: PropTypes.func.isRequired,
};
