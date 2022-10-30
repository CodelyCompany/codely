import React, { useEffect, useState } from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import { Box, Container, Typography } from '@mui/material';
import axios from 'axios';
import * as _ from 'lodash';

import SectionWrapper from './SectionWrapper';
import UserExercisesList from './UserExercisesList';
import WrittenComments from './WrittenComments';

const UserDetails = () => {
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    if (isAuthenticated && _.isEmpty(userDetails)) {
      (async () => {
        try {
          const token = await getAccessTokenSilently({
            audience: `${
              process.env.REACT_APP_BACKEND || 'http://localhost:5000'
            }`,
          });
          await axios
            .get(
              `${
                process.env.REACT_APP_BACKEND || 'http://localhost:5000'
              }/users`,
              { headers: { Authorization: `Bearer ${token}` } }
            )
            .then((response) => {
              setUserDetails(
                response.data.find((us) => us.username === user.nickname)
              );
            });
        } catch (e) {
          console.error(e);
        }
      })();
    }
  }, [isAuthenticated]);

  //   response
  //[
  //     {
  //         "_id": "635ea903bab7b1331427fda5",
  //         "username": "grubyalancio",
  //         "preparedExcercises": [],
  //         "doneExcercises": [],
  //         "writtenComments": [],
  //         "creationDate": "2022-10-30T16:40:35.340Z",
  //         "__v": 0
  //     }
  // ]

  return (
    <Container sx={{ height: '100%' }}>
      {!_.isEmpty(userDetails) && (
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
              {userDetails.username}
            </Typography>
            <Typography color='primary' variant='h6'>
              User since:{' '}
              {new Date(userDetails.creationDate).toLocaleDateString()}
            </Typography>
          </Box>
          <SectionWrapper
            condition={!_.isEmpty(userDetails.doneExcercises)}
            mode='done'
          >
            <UserExercisesList
              exercises={userDetails.doneExcercises}
              mode='done'
            />
          </SectionWrapper>
          <SectionWrapper
            condition={!_.isEmpty(userDetails.preparedExcercises)}
            mode='prepared'
          >
            <UserExercisesList
              exercises={userDetails.preparedExcercises}
              mode='prepared'
            />
          </SectionWrapper>
          <SectionWrapper
            mode='comments'
            condition={!_.isEmpty(userDetails.writtenComments)}
          >
            <WrittenComments comments={userDetails.writtenComments} />
          </SectionWrapper>
        </Box>
      )}
    </Container>
  );
};

export default UserDetails;
