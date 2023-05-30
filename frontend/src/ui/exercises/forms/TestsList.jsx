import React from 'react';

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
import useExerciseData from 'helpers/useExerciseData';
import useTheme from 'helpers/useTheme';
import * as _ from 'lodash';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const TestsList = () => {
  const { t } = useTranslation();
  const { user } = useAuth0();
  const { color } = useTheme();
  const { exercise } = useExerciseData();
  const foundUser = useSelector(getUserByUsername(user.nickname)) ?? {
    theme: 0,
  };

  return (
    <TableContainer
      id='tests-container'
      className={`theme-${foundUser.theme}`}
      component={Paper}
      sx={{ borderColor: color }}
    >
      <span>{t('created-tests-label')}</span>
      {exercise?.argumentsName && (
        <Table
          id='tests-table'
          className={`theme-${foundUser.theme}`}
          aria-label='simple table'
        >
          <TableHead>
            <TableRow>
              {exercise?.argumentsName.map((arg) => (
                <TableCell
                  className={`theme-${foundUser.theme} tests-table-cell`}
                  key={arg}
                  align='center'
                >
                  <span className={`theme-${foundUser.theme}`}>{arg}</span>
                </TableCell>
              ))}
              <TableCell
                className={`theme-${foundUser.theme} tests-table-cell`}
                align='center'
              >
                <span className={`theme-${foundUser.theme}`}>
                  {t('output-label')}
                </span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {exercise.tests?.map((test) => (
              <TableRow key={_.uniqueId()}>
                {test.input.map((row) => (
                  <TableCell
                    className={`theme-${foundUser.theme} tests-table-cell`}
                    align='center'
                    key={_.uniqueId()}
                  >
                    <span className={`theme-${foundUser.theme}`}>{row}</span>
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
