import React, { useMemo } from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import { Box, Button } from '@mui/material';
import axios from 'axios';
import { PropTypes } from 'prop-types';
import { useTranslation } from 'react-i18next';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { addPopup } from '../../../ducks/popups/actions';
import { getSocket } from '../../../ducks/socket/selectors';
import { getToken } from '../../../ducks/token/selectors';
import { getUserByUsername } from '../../../ducks/user/selectors';
import GetToken from '../../user/GetToken';

const Buttons = ({
  socket,
  code,
  won,
  token,
  setOutput,
  functionName,
  argumentValues,
  language,
  setLoadingFinished,
  loadingFinished,
}) => {
  const { t } = useTranslation();
  const { user } = useAuth0();
  const { roomId, id } = useParams();
  const foundUser = useSelector(getUserByUsername(user.nickname));
  const dispatch = useDispatch();
  const color = useMemo(
    () =>
      parseInt(localStorage.getItem('theme') ?? 0) === 2
        ? 'secondary'
        : 'primary',
    [localStorage.getItem('theme')]
  );
  const runCode = (code) => {
    setLoadingFinished(false);
    axios
      .post(
        `${
          process.env.REACT_APP_CONTAINERS_ADDRESS || 'http://localhost:5001'
        }/${language.toLowerCase() === 'c++' ? 'cpp' : language.toLowerCase()}`,
        {
          toExecute: code,
          func: functionName,
          args: argumentValues,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setOutput(response.data.output.toString());
      })
      .catch((err) => console.log(err))
      .finally(() => setLoadingFinished(true));
  };

  const finishEx = () => {
    setLoadingFinished(false);
    axios
      .put(
        `${process.env.REACT_APP_BACKEND}/exercises/checkVersus/${id}/room/${roomId}`,
        {
          user: foundUser._id,
          won,
          solution: code,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        if (response.data.tests === response.data.correct) {
          dispatch(addPopup(
            'Congratulation! Your code passed all tests',
            'success'
          ));
          socket.emit('game-finished', roomId);
          return;
        }
        dispatch(addPopup(
          "Unfortunately, your code didn't pass tests",
          'error'
        ));
      })
      .finally(() => setLoadingFinished(true));
  };

  return (
    <>
      <GetToken />
      <Box
        id='versus-run-buttons'
      >
        <Button
          disabled={!loadingFinished}
          color={color}
          variant='contained'
          onClick={() => runCode(code)}
        >
          {t('Run')}
        </Button>
        <Button
          disabled={!loadingFinished}
          color={color}
          variant='contained'
          onClick={finishEx}
        >
          {t('Submit')}
        </Button>
      </Box>
    </>
  );
};

const mapStateToProps = (state) => ({
  socket: getSocket(state),
  token: getToken(state),
});

export default connect(mapStateToProps)(Buttons);

Buttons.propTypes = {
  socket: PropTypes.object,
  code: PropTypes.string.isRequired,
  won: PropTypes.bool.isRequired,
  token: PropTypes.string,
  setOutput: PropTypes.func.isRequired,
  functionName: PropTypes.string.isRequired,
  argumentValues: PropTypes.array.isRequired,
  language: PropTypes.string.isRequired,
  setLoadingFinished: PropTypes.func.isRequired,
  loadingFinished: PropTypes.bool.isRequired,
};
