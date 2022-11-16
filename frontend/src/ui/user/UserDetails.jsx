import React from 'react';
import { useEffect } from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import { Box, Container, Typography } from '@mui/material';
import * as _ from 'lodash';
import { PropTypes } from 'prop-types';
import { connect, useSelector } from 'react-redux';

import { getToken } from '../../ducks/token/selectors';
import { GetUsers } from '../../ducks/user/operations';
import { getUserByUsername } from '../../ducks/user/selectors';

import GetToken from './GetToken';
import SectionWrapper from './SectionWrapper';
import UncheckedExercises from './UncheckedExercises';
import UserExercisesList from './UserExercisesList';
import WrittenReviews from './WrittenReviews';

const UserDetails = ({ GetUsers, token }) => {
  const { user } = useAuth0();

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
              borderBottom: '3px solid rgb(25, 118, 210)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'end',
            }}
          >
            <Typography
              color='primary'
              variant='h2'
              sx={{
                fontWeight: 'bolder',
              }}
            >
              {foundUser.username}
            </Typography>
            <Typography color='primary' variant='h6'>
              User since:{' '}
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
