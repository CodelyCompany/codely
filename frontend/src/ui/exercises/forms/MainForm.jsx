import React, { useEffect, useState } from 'react';

import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { GetAllExercises, GetExercise } from 'ducks/exercises/operations';
import { StopRedirect } from 'ducks/redirects/actions';
import { isRedirect } from 'ducks/redirects/selector';
import usePageTitle from 'helpers/usePageTitle';
import useTheme from 'helpers/useTheme';
import useToken from 'helpers/useToken';
import { PropTypes } from 'prop-types';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import CustomizeExercise from 'ui/exercises/forms/CustomizeExercise';
import ExampleSolution from 'ui/exercises/forms/ExampleSolution';
import ExercisesForm from 'ui/exercises/forms/ExercisesForm';
import HintsForms from 'ui/exercises/forms/HintsForms';
import TestsForm from 'ui/exercises/forms/TestsForm';

import Pages from 'consts/pages';

function MainForm({ GetExercise, redirect, StopRedirect, GetAllExercises }) {
  const { color } = useTheme();
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const { id } = useParams();
  const { t } = useTranslation();
  const { token } = useToken();
  usePageTitle(Pages.EXERCISE_FORM);

  useEffect(() => {
    GetAllExercises(token);
  }, []);

  useEffect(() => {
    if (redirect) {
      navigate('/exercises');
      StopRedirect();
    }
  }, [redirect]);

  useEffect(() => {
    id && GetExercise(id, token);
  }, [token]);

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
      expandIcon={<ArrowForwardIosSharpIcon id='arrow-forward-icon' />}
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
    <div id='main-form-container'>
      <Accordion
        sx={{ backgroundColor: 'primary.background' }}
        disabled={step !== 1}
        expanded={step === 1}
      >
        <AccordionSummary
          sx={{ backgroundColor: color }}
          aria-controls='panel1d-content'
          id='panel1d-header'
        >
          <Typography className='typography-header'>
            {t('main-info-label')}
          </Typography>
        </AccordionSummary>
        <AccordionDetails className='main-form-accordion'>
          <Typography className='accordion-text' sx={{ color }}>
            {t(
              'exercise-form-info')}
          </Typography>
          {step === 1 && <ExercisesForm setStep={setStep} />}
        </AccordionDetails>
      </Accordion>
      <Accordion
        sx={{ backgroundColor: 'primary.background' }}
        disabled={step !== 2}
        expanded={step === 2}
      >
        <AccordionSummary
          sx={{ backgroundColor: color }}
          aria-controls='panel3d-content'
          id='panel3d-header'
        >
          <Typography className='typography-header'>
            {t('exercise-form-function-header')}
          </Typography>
        </AccordionSummary>
        <AccordionDetails className='main-form-accordion'>
          <Typography className='accordion-text' sx={{ color }}>
            {t('exercise-form-arguments-info')}
          </Typography>
          {step === 2 && <CustomizeExercise setStep={setStep} />}
        </AccordionDetails>
      </Accordion>
      <Accordion
        sx={{ backgroundColor: 'primary.background' }}
        disabled={step !== 3}
        expanded={step === 3}
      >
        <AccordionSummary
          sx={{ backgroundColor: color }}
          aria-controls='panel2d-content'
          id='panel2d-header'
        >
          <Typography className='typography-header'>
            {t('inputs-outputs-label')}
          </Typography>
        </AccordionSummary>
        <AccordionDetails className='main-form-accordion'>
          <Typography className='accordion-text' sx={{ color }}>
            {t(
              'form-tests-info'
            )}
          </Typography>
          {step === 3 && <TestsForm setStep={setStep} />}
        </AccordionDetails>
      </Accordion>
      <Accordion
        sx={{ backgroundColor: 'primary.background' }}
        disabled={step !== 4}
        expanded={step === 4}
      >
        <AccordionSummary
          sx={{ backgroundColor: color }}
          aria-controls='panel3d-content'
          id='panel3d-header'
        >
          <Typography className='typography-header'>{t('hints-label')}</Typography>
        </AccordionSummary>
        <AccordionDetails className='main-form-accordion'>
          <Typography className='accordion-text' sx={{ color }}>
            {t('form-hints-info')}
          </Typography>
          {step === 4 && <HintsForms setStep={setStep} />}
        </AccordionDetails>
      </Accordion>

      <Accordion
        sx={{ backgroundColor: 'primary.background' }}
        disabled={step !== 5}
        expanded={step === 5}
      >
        <AccordionSummary
          sx={{ backgroundColor: color }}
          aria-controls='panel3d-content'
          id='panel3d-header'
        >
          <Typography className='typography-header'>
            {t('example-solution-label')}
          </Typography>
        </AccordionSummary>
        <AccordionDetails className='main-form-accordion'>
          <Typography className='accordion-text' sx={{ color }}>
            {t('example-solution-info')}
          </Typography>
          {step === 5 && <ExampleSolution setStep={setStep} />}
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
  GetAllExercises,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainForm);

MainForm.propTypes = {
  GetExercise: PropTypes.func,
  redirect: PropTypes.bool,
  StopRedirect: PropTypes.func,
  token: PropTypes.string,
  GetAllExercises: PropTypes.func.isRequired,
};
