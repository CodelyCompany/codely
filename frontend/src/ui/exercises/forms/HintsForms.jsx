import React, { useEffect, useState } from 'react';

// import { useAuth0 } from '@auth0/auth0-react';
import { Box, MenuItem } from '@mui/material';
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { AddExercise } from '../../../ducks/exercises/operations';

const HintsForms = ({ AddExercise }) => {
  const [hintsQuantity, setHintsQuantity] = useState('');
  const navigate = useNavigate();
  const [hints, setHints] = useState([]);
  //   const { user } = useAuth0();

  // It should be changed in the future
  const submitValues = () => {
    // let id;
    if (canSubmit())
      axios
        .get(`${process.env.REACT_APP_BACKEND}/users/`)
        .then(() => {
          //   id = response.data.find((us) => us.username === user.nickname);

          AddExercise({
            author: '635448a3736c85f0a1c03428',
            title: 'asdkk123',
            description: 'asd',
            difficulty: '1',
            programmingLanguage: 'JavaScript',
            correctOutput: [{ input: 'asd', output: 'asd' }],
            hints: ['asdasd'],
          });
          //   setStep((prev) => {
          //       return ({
          //       ...prev,
          //       currentStep: 4,
          //       dataFromStep3: hints,
          //     }))

          navigate('/Exercises');
        })
        .catch((err) => {
          console.log(err);
        });
  };

  const canSubmit = () => {
    let submit = true;
    if (hintsQuantity === '') return false;
    hints.forEach((el) => {
      if (el[1] === '') submit = false;
    });
    return submit;
  };

  useEffect(() => {
    setHints((prev) =>
      [...Array(hintsQuantity).keys()].map((number) => {
        const found = prev.find((el) => el[0] === number);
        if (!found) return [number, ''];
        return found;
      })
    );
  }, [hintsQuantity]);

  const getValue = (number) => {
    const found = hints.find((el) => el[0] === number);
    if (!found) return '';
    return found[1];
  };

  const handleValue = (event, number) => {
    setHints((prev) =>
      prev.map((el) => {
        if (el[0] === number) {
          return [el[0], event.target.value];
        }
        return el;
      })
    );
  };
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'start',
      }}
    >
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <TextField
          sx={{ marginBottom: '10px', width: '900px' }}
          id="hintsQuantity"
          name="hintsQuantity"
          label="Choose hints quantity"
          value={hintsQuantity}
          onChange={(e) => setHintsQuantity(parseInt(e.target.value))}
          select
        >
          {[...Array(20).keys()].map((option) => (
            <MenuItem key={option + 1} value={option + 1}>
              {option + 1}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <form
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          width: '900px',
          margin: '10px',
        }}
      >
        {hintsQuantity !== '' &&
          [...Array(hintsQuantity).keys()].map((number) => (
            <div key={number} style={{ width: '100%' }}>
              <TextField
                sx={{
                  marginBottom: '10px',
                  marginRight: '10px',
                  width: '100%',
                }}
                label={number === 0 ? 'Hints' : ''}
                name="hint"
                value={getValue(number)}
                onChange={(e) => handleValue(e, number)}
              />
            </div>
          ))}

        <Button
          fullWidth
          type="button"
          onClick={() => submitValues()}
          variant="contained"
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};

const mapDispatchToProps = {
  AddExercise,
};

export default connect(null, mapDispatchToProps)(HintsForms);

HintsForms.propTypes = {
  AddExercise: PropTypes.func.isRequired,
  //   step: PropTypes.object.isRequired,
};
