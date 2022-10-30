import React from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import { Box, Container, Typography } from '@mui/material';
import * as _ from 'lodash';
import { connect, useSelector } from 'react-redux';

import { getUserByUsername } from '../../ducks/user/selectors';

import SectionWrapper from './SectionWrapper';
import UserExercisesList from './UserExercisesList';
import WrittenComments from './WrittenComments';

const UserDetails = () => {
  const { user } = useAuth0();

  const foundUser = useSelector((state) =>
    getUserByUsername(state, user.nickname)
  );

  return (
    <Container sx={{ height: '100%' }}>
      {console.log(foundUser)}
      {!_.isEmpty(foundUser) && (
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
            condition={!_.isEmpty(foundUser.doneExcercises)}
            mode='done'
          >
            <UserExercisesList
              exercises={foundUser.doneExcercises}
              mode='done'
            />
          </SectionWrapper>
          <SectionWrapper
            condition={!_.isEmpty(foundUser.preparedExcercises)}
            mode='prepared'
          >
            <UserExercisesList
              exercises={foundUser.preparedExcercises}
              mode='prepared'
            />
          </SectionWrapper>
          <SectionWrapper
            mode='comments'
            condition={!_.isEmpty(foundUser.writtenComments)}
          >
            <WrittenComments comments={foundUser.writtenComments} />
          </SectionWrapper>
        </Box>
      )}
    </Container>
  );
};

export default connect(null, null)(UserDetails);
