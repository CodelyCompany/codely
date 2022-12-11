import React, { useMemo } from 'react';

import { useAuth0 } from '@auth0/auth0-react';
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
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { getUserByUsername } from '../../../ducks/user/selectors';

const TestsList = ({ step }) => {
  const { t } = useTranslation();
  const { user } = useAuth0();
  const foundUser = useSelector(getUserByUsername(user.nickname)) ?? {
    theme: 0,
  };
  const color = useMemo(
    () =>
      parseInt(localStorage.getItem('theme') ?? 0) === 2
        ? 'secondary.main'
        : 'primary.main',
    [localStorage.getItem('theme')]
  );
  return (
    <TableContainer
      className={`theme-${foundUser.theme}`}
      component={Paper}
      sx={{
        marginTop: '20px',
        borderColor: color,
        border: '3px solid',
      }}
    >
      <span
        style={{
          fontWeight: 'bolder',
          textAlign: 'start',
          margin: '10px',
          fontSize: '20px',
        }}
      >
        {t('Created tests')}
      </span>
      {step.dataFromStep2?.argumentsName && step.dataFromStep3 && (
        <Table
          className={`theme-${foundUser.theme}`}
          sx={{ minWidth: 650 }}
          aria-label='simple table'
        >
          <TableHead>
            <TableRow>
              {step.dataFromStep2.argumentsName.map((arg) => (
                <TableCell
                  className={`theme-${foundUser.theme}`}
                  key={arg}
                  align='center'
                >
                  <span
                    className={`theme-${foundUser.theme}`}
                    style={{
                      fontWeight: 'bolder',
                      fontSize: '20px',
                    }}
                  >
                    {arg}
                  </span>
                </TableCell>
              ))}
              <TableCell className={`theme-${foundUser.theme}`} align='center'>
                <span
                  className={`theme-${foundUser.theme}`}
                  style={{
                    fontWeight: 'bolder',
                    fontSize: '20px',
                  }}
                >
                  {t('Output')}
                </span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {step.dataFromStep3.map((test) => (
              <TableRow key={_.uniqueId()}>
                {test.input.map((row) => (
                  <TableCell
                    className={`theme-${foundUser.theme}`}
                    align='center'
                    key={_.uniqueId()}
                  >
                    <span
                      className={`theme-${foundUser.theme}`}
                      style={{ fontWeight: 'bolder' }}
                    >
                      {row}
                    </span>
                  </TableCell>
                ))}
                <TableCell
                  className={`theme-${foundUser.theme}`}
                  align='center'
                >
                  <span
                    className={`theme-${foundUser.theme}`}
                    style={{
                      fontWeight: 'bolder',
                    }}
                  >
                    {test.output}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
};

export default TestsList;

TestsList.propTypes = {
  step: PropTypes.object,
};
