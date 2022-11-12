import React, { useEffect, useState } from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { PropTypes } from 'prop-types';
import { connect, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { GetExercise } from '../../../ducks/exercises/operations';
import { getExerciseById } from '../../../ducks/exercises/selectors';
import { StopRedirect } from '../../../ducks/redirects/actions';
import { isRedirect } from '../../../ducks/redirects/selector';

import CustomizeExercise from './CustomizeExercise';
import ExampleSolution from './ExampleSolution';
import ExercisesForm from './ExercisesForm';
import HintsForms from './HintsForms';
import TestsForm from './TestsForm';

function MainForm({ GetExercise, redirect, StopRedirect }) {
  const [step, setStep] = useState({
    currentStep: 1,
    dataFromStep1: '',
    dataFromStep2: '',
    dataFromStep3: '',
    dataFromStep4: '',
    dataFromStep5: '',
  });

  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();
  const { id } = useParams();
  const exercise = useSelector((state) => getExerciseById(state, id));

  useEffect(() => {
    if (redirect) {
      navigate('/exercises');
      StopRedirect();
    }
  }, [redirect]);

  useEffect(() => {
    id &&
      (async () => {
        const token = await getAccessTokenSilently({
          audience: `${
            process.env.REACT_APP_BACKEND || 'http://localhost:5000'
          }`,
        });
        await GetExercise(id, token);
      })();
  }, []);

  const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
  }));

  const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
      expandIcon={
        <ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem', color: 'white' }} />
      }
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, .05)'
        : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
      marginLeft: theme.spacing(1),
    },
  }));

  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
  }));

  return (
    <div>
      <Accordion
        disabled={step.currentStep !== 1}
        expanded={step.currentStep === 1}
      >
        <AccordionSummary
          sx={{ backgroundColor: 'rgb(25, 118, 210)' }}
          aria-controls='panel1d-content'
          id='panel1d-header'
        >
          <Typography sx={{ color: 'white' }}>Main info</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ textAlign: 'center' }}>
          <Typography
            color='primary'
            sx={{ margin: '10px', fontWeight: 'bolder' }}
          >
            Here you can set title, description and difficulty of your exercise.
            Remember to set the most proper programming language!
          </Typography>
          <ExercisesForm setStep={setStep} dataToEdit={exercise} step={step} />
        </AccordionDetails>
      </Accordion>
      <Accordion
        disabled={step.currentStep !== 2}
        expanded={step.currentStep === 2}
      >
        <AccordionSummary
          sx={{ backgroundColor: 'rgb(25, 118, 210)' }}
          aria-controls='panel3d-content'
          id='panel3d-header'
        >
          <Typography sx={{ color: 'white' }}>
            Customize exercise function
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ textAlign: 'center' }}>
          <Typography
            color='primary'
            sx={{ margin: '10px', fontWeight: 'bolder' }}
          >
            Here you can set amount of arguments for your function. You have to
            set the name for each argument.
          </Typography>
          <CustomizeExercise step={step} setStep={setStep} />
        </AccordionDetails>
      </Accordion>
      <Accordion
        disabled={step.currentStep !== 3}
        expanded={step.currentStep === 3}
      >
        <AccordionSummary
          sx={{ backgroundColor: 'rgb(25, 118, 210)' }}
          aria-controls='panel2d-content'
          id='panel2d-header'
        >
          <Typography sx={{ color: 'white' }}>Inputs \ Outputs</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ textAlign: 'center' }}>
          <Typography
            color='primary'
            sx={{ margin: '10px', fontWeight: 'bolder' }}
          >
            Choose quantity of your tests, then write expected outputs for each
            of your inputs.
          </Typography>
          <TestsForm setStep={setStep} dataToEdit={exercise} step={step} />
        </AccordionDetails>
      </Accordion>
      <Accordion
        disabled={step.currentStep !== 4}
        expanded={step.currentStep === 4}
      >
        <AccordionSummary
          sx={{ backgroundColor: 'rgb(25, 118, 210)' }}
          aria-controls='panel3d-content'
          id='panel3d-header'
        >
          <Typography sx={{ color: 'white' }}>Hints</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ textAlign: 'center' }}>
          <Typography
            color='primary'
            sx={{ margin: '10px', fontWeight: 'bolder' }}
          >
            Here you can choose quantity of your tests. Remember that not all
            users will be able to solve your exercise without some help.
          </Typography>
          <HintsForms step={step} setStep={setStep} dataToEdit={exercise} />
        </AccordionDetails>
      </Accordion>

      <Accordion
        disabled={step.currentStep !== 5}
        expanded={step.currentStep === 5}
      >
        <AccordionSummary
          sx={{ backgroundColor: 'rgb(25, 118, 210)' }}
          aria-controls='panel3d-content'
          id='panel3d-header'
        >
          <Typography sx={{ color: 'white' }}>Example Solution</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ textAlign: 'center' }}>
          <Typography
            color='primary'
            sx={{ margin: '10px', fontWeight: 'bolder' }}
          >
            Here you have to write an example solution to guarantee that your
            exercise is solvable. After solving, your exercise will be send to
            the admin to get an agreement.
          </Typography>
          <ExampleSolution step={step} setStep={setStep} />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

const mapStateToProps = (state) => ({
  redirect: isRedirect(state),
});

const mapDispatchToProps = {
  GetExercise,
  StopRedirect,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainForm);

MainForm.propTypes = {
  GetExercise: PropTypes.func,
  redirect: PropTypes.bool,
  StopRedirect: PropTypes.func,
};
