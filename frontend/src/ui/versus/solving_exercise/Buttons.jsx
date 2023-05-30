import React from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import { Box, Button } from '@mui/material';
import axios from 'axios';
import { addPopup } from 'ducks/popups/actions';
import { getSocket } from 'ducks/socket/selectors';
import { getUserByUsername } from 'ducks/user/selectors';
import useTheme from 'helpers/useTheme';
import useToken from 'helpers/useToken';
import { PropTypes } from 'prop-types';
import { useTranslation } from 'react-i18next';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
const Buttons = ({
  socket,
  code,
  won,
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
  const { token } = useToken();
  const foundUser = useSelector(getUserByUsername(user.nickname));
  const dispatch = useDispatch();
  const { theme } = useTheme();
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
          dispatch(
            addPopup('tests-passed-message', 'success')
          );
          socket.emit('game-finished', roomId);
          return;
        }
        dispatch(
          addPopup('tests-not-passed-message', 'error')
        );
      })
      .finally(() => setLoadingFinished(true));
  };

  return (
    <>
      <Box id='versus-run-buttons'>
        <Button
          disabled={!loadingFinished}
          color={theme}
          variant='contained'
          onClick={() => runCode(code)}
        >
          {t('run-label')}
        </Button>
        <Button
          disabled={!loadingFinished}
          color={theme}
          variant='contained'
          onClick={finishEx}
        >
          {t('submit-label')}
        </Button>
      </Box>
    </>
  );
};

const mapStateToProps = (state) => ({
  socket: getSocket(state),
});

export default connect(mapStateToProps)(Buttons);

Buttons.propTypes = {
  socket: PropTypes.object,
  code: PropTypes.string.isRequired,
  won: PropTypes.bool.isRequired,
  setOutput: PropTypes.func.isRequired,
  functionName: PropTypes.string.isRequired,
  argumentValues: PropTypes.array.isRequired,
  language: PropTypes.string.isRequired,
  setLoadingFinished: PropTypes.func.isRequired,
  loadingFinished: PropTypes.bool.isRequired,
};
