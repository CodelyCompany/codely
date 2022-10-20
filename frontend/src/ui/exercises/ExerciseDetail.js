import React, { useEffect } from 'react';

import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import PersonIcon from '@mui/icons-material/Person';
import PsychologyIcon from '@mui/icons-material/Psychology';
import TitleIcon from '@mui/icons-material/Title';
import { Box, Container } from '@mui/material';
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

const ExerciseDetail = ({ GetExercises }) => {
  const { id } = useParams();
  const exercise = useSelector((state) => getExerciseById(state, id));

  useEffect(() => {
    if (_.isEmpty(exercise)) GetExercises();
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
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: 'rgb(25, 118, 210)' }}>
                  <TitleIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Title" secondary={exercise.title} />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: 'rgb(25, 118, 210)' }}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Author"
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
                primary="Programming Language"
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
                primary="Difficulty"
                secondary={exercise.difficulty}
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: 'rgb(25, 118, 210)' }}>
                  <FormatColorTextIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Description"
                secondary={exercise.description}
              />
            </ListItem>
          </List>
        </Box>
        <Box></Box>
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
