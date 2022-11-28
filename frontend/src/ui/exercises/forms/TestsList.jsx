import * as React from 'react';

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import * as _ from 'lodash';
import { PropTypes } from 'prop-types';

const TestsList = ({ step }) => (
  <TableContainer
    component={Paper}
    sx={{ marginTop: '20px', border: '3px solid rgb(25, 118, 210)' }}
  >
    <span
      style={{
        fontWeight: 'bolder',
        color: 'rgb(25, 118, 210)',
        textAlign: 'start',
        margin: '10px',
        fontSize: '20px',
      }}
    >
      Created tests
    </span>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          {step.dataFromStep2.argumentsName.map((arg) => (
            <TableCell key={arg} align="center">
              <span
                style={{
                  fontWeight: 'bolder',
                  color: 'rgb(25, 118, 210)',
                  fontSize: '20px',
                }}
              >
                {arg}
              </span>
            </TableCell>
          ))}
          <TableCell align="center">
            <span
              style={{
                fontWeight: 'bolder',
                color: 'rgb(25, 118, 210)',
                fontSize: '20px',
              }}
            >
              Output
            </span>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {step.dataFromStep3.map((test) => (
          <TableRow key={_.uniqueId()}>
            {test.input.map((row) => (
              <TableCell align="center" key={_.uniqueId()}>
                <span style={{ fontWeight: 'bolder' }}>{row}</span>
              </TableCell>
            ))}
            <TableCell align="center">
              <span style={{ fontWeight: 'bolder' }}>{test.output}</span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default TestsList;

TestsList.propTypes = {
  step: PropTypes.object,
};
