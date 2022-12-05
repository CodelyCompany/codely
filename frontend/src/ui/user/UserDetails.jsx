import React, { useMemo } from 'react';
import { useEffect } from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import { Box, Container, Typography } from '@mui/material';
import * as _ from 'lodash';
import { PropTypes } from 'prop-types';
import { useTranslation } from 'react-i18next';
import { connect, useSelector } from 'react-redux';

import { getToken } from '../../ducks/token/selectors';
import { GetUsers } from '../../ducks/user/operations';
import { getUserByUsername } from '../../ducks/user/selectors';

import GetToken from './GetToken';
import SectionWrapper from './SectionWrapper';
import UncheckedExercises from './UncheckedExercises';
import UserExercisesList from './UserExercisesList';
import VersusResults from './VersusResults';
import WrittenReviews from './WrittenReviews';

const UserDetails = ({ GetUsers, token }) => {
  const { t } = useTranslation();
  const { user } = useAuth0();
  const color = useMemo(
    () =>
      parseInt(localStorage.getItem('theme') ?? 0) === 2
        ? 'secondary.main'
        : 'primary.main',
    [localStorage.getItem('theme')]
  );
  useEffect(() => {
    GetUsers(token);
  }, [token]);

  const foundUser = useSelector(getUserByUsername(user.nickname));

  return (
    <Container sx={{ height: '100%' }}>
      <GetToken />
      {foundUser && (
        <Box sx={{ margin: '20px' }}>
          <Box
            sx={{
              borderColor: color,
              borderBottom: '3px solid',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'end',
            }}
          >
            <Typography
              variant='h2'
              sx={{
                fontWeight: 'bolder',
                color,
              }}
            >
              {foundUser.username}
            </Typography>
            <Typography sx={{ color }} variant='h6'>
              {t('User since:')}{' '}
              {new Date(foundUser.creationDate).toLocaleDateString()}
            </Typography>
          </Box>
          <SectionWrapper
            condition={!_.isEmpty(foundUser.doneExercises)}
            mode='done'
          >
            <UserExercisesList
              exercises={foundUser.doneExercises}
              mode='done'
            />
          </SectionWrapper>
          <SectionWrapper
            condition={
              !_.isEmpty(foundUser.preparedExercises.filter((el) => el.checked))
            }
            mode='prepared'
          >
            <UserExercisesList
              exercises={foundUser.preparedExercises.filter((el) => el.checked)}
              mode='prepared'
            />
          </SectionWrapper>
          <SectionWrapper
            mode='unchecked'
            condition={
              !_.isEmpty(
                foundUser.preparedExercises.filter((el) => !el.checked)
              )
            }
          >
            <UncheckedExercises
              exercises={foundUser.preparedExercises.filter(
                (el) => !el.checked
              )}
            />
          </SectionWrapper>
          <SectionWrapper
            mode='reviews'
            condition={!_.isEmpty(foundUser.writtenReviews)}
          >
            <WrittenReviews reviews={foundUser.writtenReviews} />
          </SectionWrapper>
          <SectionWrapper
            mode='versus'
            condition={foundUser.wonVersus > 0 || foundUser.lostVersus > 0}
          >
            <VersusResults
              won={foundUser.wonVersus}
              lost={foundUser.lostVersus}
            />
          </SectionWrapper>
        </Box>
      )}
    </Container>
  );
};

const mapStateToProps = (state) => ({
  token: getToken(state),
});

const mapDispatchToProps = {
  GetUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);

UserDetails.propTypes = {
  GetUsers: PropTypes.func.isRequired,
  token: PropTypes.string,
};
