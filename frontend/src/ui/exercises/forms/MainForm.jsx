import React, { useState } from 'react';

import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import ExercisesForm from './ExercisesForm';
import HintsForms from './HintsForms';
import TestsForm from './TestsForm';

function MainForm() {
  const [step, setStep] = useState({
    currentStep: 1,
    dataFromStep1: '',
    dataFromStep2: '',
    dataFromStep3: '',
  });

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
          aria-controls="panel1d-content"
          id="panel1d-header"
        >
          <Typography sx={{ color: 'white' }}>Main info</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ textAlign: 'center' }}>
          <Typography sx={{ margin: '10px' }}>
            Here you can set title, description and difficulty of your exercise.
            Remember to set the most proper programming language!
          </Typography>
          <ExercisesForm setStep={setStep} />
        </AccordionDetails>
      </Accordion>
      <Accordion
        disabled={step.currentStep !== 2}
        expanded={step.currentStep === 2}
      >
        <AccordionSummary
          sx={{ backgroundColor: 'rgb(25, 118, 210)' }}
          aria-controls="panel2d-content"
          id="panel2d-header"
        >
          <Typography sx={{ color: 'white' }}>Inputs \ Outputs</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ textAlign: 'center' }}>
          <Typography sx={{ margin: '10px' }}>
            Choose quantity of your tests, then write expected outputs for each
            of your inputs.
          </Typography>
          <TestsForm setStep={setStep} />
        </AccordionDetails>
      </Accordion>
      <Accordion
        disabled={step.currentStep !== 3}
        expanded={step.currentStep === 3}
      >
        <AccordionSummary
          sx={{ backgroundColor: 'rgb(25, 118, 210)' }}
          aria-controls="panel3d-content"
          id="panel3d-header"
        >
          <Typography sx={{ color: 'white' }}>Hints</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ textAlign: 'center' }}>
          <Typography sx={{ margin: '10px' }}>
            Here you can choose quantity of your tests. Remember that not all
            users will be able to solve your exercise without some help.
          </Typography>
          <HintsForms step={step} />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default MainForm;
