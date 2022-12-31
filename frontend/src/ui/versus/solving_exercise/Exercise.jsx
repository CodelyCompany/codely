import React, { useEffect, useMemo, useRef, useState } from 'react';

import { useAuth0 } from '@auth0/auth0-react';
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
import { useTranslation } from 'react-i18next';
import { connect, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { GetExercises } from '../../../ducks/exercises/operations';
import { getExerciseById } from '../../../ducks/exercises/selectors';
import { getSocket } from '../../../ducks/socket/selectors';
import { getToken } from '../../../ducks/token/selectors';
import { getUserByUsername } from '../../../ducks/user/selectors';
import OutputField from '../../code_editor/OutputField';
import CustomArgs from '../../exercises/editor_to_exercises/CustomArgs';
import GetToken from '../../user/GetToken';

import Buttons from './Buttons';
import FinishDialog from './FinishDialog';
import VersusEditor from './VersusEditor';

const Exercise = ({ GetExercises, token, socket }) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [code, setCode] = useState('');
  const exercise = useSelector(getExerciseById(id));
  const [yourTime, setYourTime] = useState(0);
  const [opponentTime, setOpponentTime] = useState(0);
  const [won, setWon] = useState(false);
  const [opponentFinish, setOpponentFinish] = useState(false);
  const yourInteveral = useRef({});
  const opponentInteveral = useRef({});
  const [argumentValues, setArgumentValues] = useState([]);
  const [open, setOpen] = useState(false);
  const [output, setOutput] = useState('');
  const [loadingFinished, setLoadingFinished] = useState(true);

  const { user } = useAuth0();
  const foundUser = useSelector(getUserByUsername(user.nickname));
  const color = useMemo(
    () =>
      parseInt(localStorage.getItem('theme') ?? 0) === 2
        ? 'secondary'
        : 'primary',
    [localStorage.getItem('theme')]
  );
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
        <Container
          className={`theme-${foundUser.theme}`}
          sx={{ marginTop: '10px' }}
        >
          <Paper
            className={`theme-${foundUser.theme}`}
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
              {t(
                `You are in versus mode. Try to solve this exercise faster than your opponent.`
              )}
            </span>{' '}
            <span
              className={`theme-${foundUser.theme}`}
              style={{ fontWeight: 'bolder' }}
            >
              {t('Good luck & have fun!')}
            </span>
          </Paper>
          <Paper
            className={`theme-${foundUser.theme}`}
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
                {t('You-key')}
                {won ? (
                  <CheckIcon
                    color='success'
                    style={{ position: 'relative', top: '7px' }}
                  />
                ) : (
                  <CloseIcon
                    color='error'
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
                {t('Your opponent:')}{' '}
                {opponentFinish ? (
                  <CheckIcon
                    color='success'
                    style={{ posiition: 'relative', top: '7px' }}
                  />
                ) : (
                  <CloseIcon
                    color='error'
                    style={{ position: 'relative', top: '7px' }}
                  />
                )}
              </span>
              <span style={{ color: opponentFinish ? 'green' : 'red' }}>
                {getTime(opponentTime)}
              </span>
            </span>
          </Paper>
          <Box
            className={`theme-${foundUser.theme}`}
            sx={{ width: '100%', display: 'flex' }}
          >
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
                  color={color}
                  sx={{
                    borderBottom: '3px solid',
                    borderColor: `${color}.main`,
                  }}
                >
                  {exercise.title}
                </Typography>
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ backgroundColor: `${color}.main` }}>
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
                  <Avatar sx={{ backgroundColor: `${color}.main` }}>
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
                  <Avatar sx={{ backgroundColor: `${color}.main` }}>
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
                  <Avatar sx={{ backgroundColor: `${color}.main` }}>
                    <FormatColorTextIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={t('Description')}
                  secondary={exercise.description}
                />
              </ListItem>
            </List>
          </Box>
          <Box sx={{ marginBottom: '50px' }}>
            <CustomArgs
              args={exercise.argumentsName}
              argumentValues={argumentValues}
              setArgumentValues={setArgumentValues}
            />
            <Buttons
              setLoadingFinished={setLoadingFinished}
              code={code}
              won={!opponentFinish}
              setOutput={setOutput}
              functionName={exercise.functionName}
              argumentValues={argumentValues}
              language={exercise.programmingLanguage}
            />
            <VersusEditor
              code={code}
              setCode={setCode}
              language={exercise.programmingLanguage}
              functionSignature={exercise.functionSignature}
            />
            {output && <OutputField output={output} loadingFinished={loadingFinished}/>}
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
