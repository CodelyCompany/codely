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
import { getUserByUsername } from 'ducks/user/selectors';
import * as _ from 'lodash';
import { PropTypes } from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

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
      id="tests-container"
      className={`theme-${foundUser.theme}`}
      component={Paper}
      sx={{ borderColor: color }}
    >
      <span>
        {t('Created tests')}
      </span>
      {step.dataFromStep2?.argumentsName && step.dataFromStep3 && (
        <Table
          id="tests-table"
          className={`theme-${foundUser.theme}`}
          aria-label='simple table'
        >
          <TableHead>
            <TableRow>
              {step.dataFromStep2.argumentsName.map((arg) => (
                <TableCell
                  className={`theme-${foundUser.theme} tests-table-cell`}
                  key={arg}
                  align='center'
                >
                  <span className={`theme-${foundUser.theme}`}>
                    {arg}
                  </span>
                </TableCell>
              ))}
              <TableCell className={`theme-${foundUser.theme} tests-table-cell`} align='center'>
                <span className={`theme-${foundUser.theme}`}>
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
                    className={`theme-${foundUser.theme} tests-table-cell`}
                    align='center'
                    key={_.uniqueId()}
                  >
                    <span className={`theme-${foundUser.theme}`}>
                      {row}
                    </span>
                  </TableCell>
                ))}
                <TableCell
                  className={`theme-${foundUser.theme} tests-table-cell`}
                  align='center'
                >
                  <span className={`theme-${foundUser.theme}`}>
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
