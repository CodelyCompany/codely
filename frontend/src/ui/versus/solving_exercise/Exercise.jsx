import React, { useEffect, useState } from 'react';

import CheckIcon from '@mui/icons-material/Check'; // solved
import CloseIcon from '@mui/icons-material/Close'; // didnt finish
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import PersonIcon from '@mui/icons-material/Person';
import PsychologyIcon from '@mui/icons-material/Psychology';
import StarRateIcon from '@mui/icons-material/StarRate';
import { Box, Container, Paper, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import * as _ from 'lodash';
import { PropTypes } from 'prop-types';
import { connect, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { GetExercises } from '../../../ducks/exercises/operations';
import { getExerciseById } from '../../../ducks/exercises/selectors';
import { getToken } from '../../../ducks/token/selectors';
import GetToken from '../../user/GetToken';

import VersusEditor from './VersusEditor';

const Exercise = ({ GetExercises, token }) => {
  const { id } = useParams();
  const [code, setCode] = useState('');
  const exercise = useSelector(getExerciseById(id));

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
          <Box sx={{ width: '100%', display: 'flex' }}>
            <List
              sx={{
                width: '100%',
                height: '100%',
                bgcolor: 'background.paper',
              }}
            >
              <ListItem>
                <Typography
                  variant="h3"
                  color="primary"
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
                  secondary={[...Array(exercise.difficulty).keys()].map(
                    (el) => (
                      <StarRateIcon sx={{ color: 'gold' }} key={el} />
                    )
                  )}
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
          <Box>
            <Paper
              elevation={3}
              sx={{
                padding: '10px',
                margin: '10px 0',
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'center',
              }}
            >
              <span style={{ fontWeight: 'bolder' }}>
                You are in versus mode. Try to solve this exercise faster than
                your opponent.
              </span>{' '}
              <span
                style={{ color: 'rgb(25, 118, 210)', fontWeight: 'bolder' }}
              >
                Good luck & have fun!
              </span>
            </Paper>
            <Paper
              elevation={3}
              sx={{
                padding: '15px',
                margin: '10px 0',
                display: 'flex',
                flexDirection: 'column',
                color: 'rgb(25, 118, 210)',
              }}
            >
              <span style={{ fontWeight: 'bolder' }}>You: </span>{' '}
              <span style={{ fontWeight: 'bolder' }}>Your opponent: </span>
            </Paper>
            <VersusEditor
              code={code}
              setCode={setCode}
              language={exercise.programmingLanguage}
              functionSignature={exercise.functionSignature}
            />
          </Box>
        </Container>
      </>
    )
  );
};

const mapStateToProps = (state) => ({
  token: getToken(state),
});

const mapDispatchToProps = {
  GetExercises,
};

export default connect(mapStateToProps, mapDispatchToProps)(Exercise);

Exercise.propTypes = {
  GetExercises: PropTypes.func.isRequired,
  token: PropTypes.string,
};
