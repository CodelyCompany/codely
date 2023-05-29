import React, { useEffect, useRef, useState } from 'react';

import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { GetExercise } from 'ducks/exercises/operations';
import { getExerciseById } from 'ducks/exercises/selectors';
import { StopRedirect } from 'ducks/redirects/actions';
import { isRedirect } from 'ducks/redirects/selector';
import { getToken } from 'ducks/token/selectors';
import usePageTitle from 'helpers/usePageTitle';
import useTheme from 'helpers/useTheme';
import { PropTypes } from 'prop-types';
import { useTranslation } from 'react-i18next';
import { connect, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import CustomizeExercise from 'ui/exercises/forms/CustomizeExercise';
import ExampleSolution from 'ui/exercises/forms/ExampleSolution';
import ExercisesForm from 'ui/exercises/forms/ExercisesForm';
import HintsForms from 'ui/exercises/forms/HintsForms';
import TestsForm from 'ui/exercises/forms/TestsForm';

import Pages from 'consts/pages';

function MainForm({ GetExercise, redirect, StopRedirect, token }) {
  const { color } = useTheme();
  const [step, setStep] = useState({
    currentStep: 1,
    dataFromStep1: '',
    dataFromStep2: '',
    dataFromStep3: '',
    dataFromStep4: '',
    dataFromStep5: '',
  });
  const navigate = useNavigate();
  const { id } = useParams();
  const exercise = useSelector(getExerciseById(id));
  const { t } = useTranslation();
  const previousFormState = useRef(step);
  usePageTitle(Pages.EXERCISE_FORM);

  useEffect(() => {
    previousFormState.current = step;
  }, [step]);

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
        disabled={step.currentStep !== 1}
        expanded={step.currentStep === 1}
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
          <ExercisesForm setStep={setStep} dataToEdit={exercise} step={step} />
        </AccordionDetails>
      </Accordion>
      <Accordion
        sx={{ backgroundColor: 'primary.background' }}
        disabled={step.currentStep !== 2}
        expanded={step.currentStep === 2}
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
            {t(
              // eslint-disable-next-line max-len
              'exercise-form-arguments-info'
            )}
          </Typography>
          <CustomizeExercise
            step={step}
            setStep={setStep}
            dataToEdit={exercise}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion
        sx={{ backgroundColor: 'primary.background' }}
        disabled={step.currentStep !== 3}
        expanded={step.currentStep === 3}
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
          <TestsForm setStep={setStep} dataToEdit={exercise} step={step} />
        </AccordionDetails>
      </Accordion>
      <Accordion
        sx={{ backgroundColor: 'primary.background' }}
        disabled={step.currentStep !== 4}
        expanded={step.currentStep === 4}
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
          <HintsForms step={step} setStep={setStep} dataToEdit={exercise} />
        </AccordionDetails>
      </Accordion>

      <Accordion
        sx={{ backgroundColor: 'primary.background' }}
        disabled={step.currentStep !== 5}
        expanded={step.currentStep === 5}
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
          <ExampleSolution
            step={step}
            setStep={setStep}
            dataToEdit={exercise}
            previousFormState={previousFormState}
          />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

const mapStateToProps = (state) => ({
  redirect: isRedirect(state),
  token: getToken(state),
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
  token: PropTypes.string,
};
