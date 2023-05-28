import React, { useEffect, useRef, useState } from 'react';

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
import { GetExercises } from 'ducks/exercises/operations';
import { getExerciseById } from 'ducks/exercises/selectors';
import { getSocket } from 'ducks/socket/selectors';
import { getUserByUsername } from 'ducks/user/selectors';
import usePageTitle from 'helpers/usePageTitle';
import useTheme from 'helpers/useTheme';
import useToken from 'helpers/useToken';
import * as _ from 'lodash';
import { PropTypes } from 'prop-types';
import { useTranslation } from 'react-i18next';
import { connect, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import OutputField from 'ui/code_editor/OutputField';
import CustomArgs from 'ui/exercises/editor_to_exercises/CustomArgs';
import Buttons from 'ui/versus/solving_exercise/Buttons';
import FinishDialog from 'ui/versus/solving_exercise/FinishDialog';
import VersusEditor from 'ui/versus/solving_exercise/VersusEditor';

import Pages from 'consts/pages';

const Exercise = ({ GetExercises, socket }) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { token } = useToken();
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
  const { theme, color } = useTheme();
  usePageTitle(Pages.VERSUS);

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
        <Container className={`theme-${foundUser.theme} versus-exercise`}>
          <Paper
            className={`theme-${foundUser.theme} versus-exercise-wrapper`}
            elevation={3}
          >
            <span>
              {t(
                `You are in versus mode. Try to solve this exercise faster than your opponent.`
              )}
            </span>
            <span className={`theme-${foundUser.theme}`}>
              {t('Good luck & have fun!')}
            </span>
          </Paper>
          <Paper
            className={`theme-${foundUser.theme} versus-exercise-wrapper your-result`}
            elevation={3}
          >
            <span className='result-line'>
              <span>
                {t('You-key')}
                {won ? (
                  <CheckIcon className='result-icons' color='success' />
                ) : (
                  <CloseIcon className='result-icons' color='error' />
                )}
              </span>
              <span style={{ color: won ? 'green' : 'red' }}>
                {getTime(yourTime)}
              </span>
            </span>
            <span className='result-line'>
              <span>
                {t('Your opponent:')}
                {opponentFinish ? (
                  <CheckIcon className='result-icons' color='success' />
                ) : (
                  <CloseIcon className='result-icons' color='error' />
                )}
              </span>
              <span style={{ color: opponentFinish ? 'green' : 'red' }}>
                {getTime(opponentTime)}
              </span>
            </span>
          </Paper>
          <Box className={`theme-${foundUser.theme} exercise-description`}>
            <List
              className={`theme-${foundUser.theme}`}
              sx={{ bgcolor: 'background.paper' }}
            >
              <ListItem>
                <Typography
                  variant='h3'
                  color={theme}
                  sx={{
                    borderColor: color,
                  }}
                >
                  {exercise.title}
                </Typography>
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ backgroundColor: color }}>
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
                  <Avatar sx={{ backgroundColor: color }}>
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
                  <Avatar sx={{ backgroundColor: color }}>
                    <PsychologyIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={t('Difficulty')}
                  secondary={[...Array(exercise.difficulty).keys()].map(
                    (el) => (
                      <StarRateIcon className='star-icon' key={el} />
                    )
                  )}
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ backgroundColor: color }}>
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
          <Box id='versus-editor-wrapper'>
            <CustomArgs
              args={exercise.argumentsName}
              argumentValues={argumentValues}
              setArgumentValues={setArgumentValues}
            />
            <Buttons
              setLoadingFinished={setLoadingFinished}
              loadingFinished={loadingFinished}
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
            {output && (
              <OutputField output={output} loadingFinished={loadingFinished} />
            )}
          </Box>
        </Container>
      </>
    )
  );
};

const mapStateToProps = (state) => ({
  socket: getSocket(state),
});

const mapDispatchToProps = {
  GetExercises,
};

export default connect(mapStateToProps, mapDispatchToProps)(Exercise);

Exercise.propTypes = {
  GetExercises: PropTypes.func.isRequired,
  socket: PropTypes.object,
};
