import React, { useEffect, useRef, useState } from 'react';

import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
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
import { getSocket } from '../../../ducks/socket/selectors';
import { getToken } from '../../../ducks/token/selectors';
import GetToken from '../../user/GetToken';

import Buttons from './Buttons';
import FinishDialog from './FinishDialog';
import VersusEditor from './VersusEditor';

const Exercise = ({ GetExercises, token, socket }) => {
  const { id } = useParams();
  const [code, setCode] = useState('');
  const exercise = useSelector(getExerciseById(id));
  const [yourTime, setYourTime] = useState(0);
  const [opponentTime, setOpponentTime] = useState(0);
  const [won, setWon] = useState(false);
  const [opponentFinish, setOpponentFinish] = useState(false);
  const yourInteveral = useRef({});
  const opponentInteveral = useRef({});
  const [open, setOpen] = useState(false);

  const getTime = (time) =>
    `${Math.floor(time / 60)}:${
      time % 60 < 10 ? '0' + (time % 60).toString() : time % 60
    }`;

  useEffect(() => {
    socket.on('game-won', () => {
      setWon(true);
      setOpen(true);
      clearInterval(yourInteveral.current);
    });

    socket.on('game-lost', () => {
      setOpponentFinish(true);
      clearInterval(opponentInteveral.current);
    });

    socket.on('game-closed', () => {
      if (!won) setOpen(true);
      clearInterval(yourInteveral.current);
      clearInterval(opponentInteveral.current);
    });

    return () => {
      socket.off('game-won');
      socket.off('game-lost');
      socket.off('game-closed');
    };
  }, []);

  useEffect(() => {
    yourInteveral.current = setInterval(() => {
      setYourTime((prev) => prev + 1);
    }, 1000);
    return () => {
      clearInterval(yourInteveral.current);
    };
  }, []);

  useEffect(() => {
    opponentInteveral.current = setInterval(() => {
      setOpponentTime((prev) => prev + 1);
    }, 1000);
    return () => {
      clearInterval(opponentInteveral.current);
    };
  }, []);

  useEffect(() => {
    if (_.isEmpty(exercise)) {
      GetExercises(token);
    }
  }, [token]);

  return (
    exercise && (
      <>
        <FinishDialog open={open} setOpen={setOpen} won={won} />
        <GetToken />
        <Container sx={{ marginTop: '10px' }}>
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
            <span style={{ color: 'rgb(25, 118, 210)', fontWeight: 'bolder' }}>
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
            <span
              style={{
                fontWeight: 'bolder',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <span>
                You:{' '}
                {won ? (
                  <CheckIcon
                    color="success"
                    style={{ position: 'relative', top: '7px' }}
                  />
                ) : (
                  <CloseIcon
                    color="error"
                    style={{ position: 'relative', top: '7px' }}
                  />
                )}
              </span>
              <span style={{ color: won ? 'green' : 'red' }}>
                {getTime(yourTime)}
              </span>
            </span>
            <span
              style={{
                fontWeight: 'bolder',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <span>
                Your opponent:{' '}
                {opponentFinish ? (
                  <CheckIcon
                    color="success"
                    style={{ posiition: 'relative', top: '7px' }}
                  />
                ) : (
                  <CloseIcon
                    color="error"
                    style={{ position: 'relative', top: '7px' }}
                  />
                )}
              </span>
              <span style={{ color: opponentFinish ? 'green' : 'red' }}>
                {getTime(opponentTime)}
              </span>
            </span>
          </Paper>
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
            <Buttons />
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
  socket: getSocket(state),
});

const mapDispatchToProps = {
  GetExercises,
};

export default connect(mapStateToProps, mapDispatchToProps)(Exercise);

Exercise.propTypes = {
  GetExercises: PropTypes.func.isRequired,
  token: PropTypes.string,
  socket: PropTypes.object,
};
