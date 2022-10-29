import React, { useEffect, useState } from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import { Box } from '@mui/material';
import axios from 'axios';
import * as _ from 'lodash';

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

  return <Box>You are logged as: {userDetails && userDetails.username}</Box>;
};

export default UserDetails;
