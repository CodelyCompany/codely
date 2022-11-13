import React from 'react';
import { useEffect } from 'react';

import { Card } from '@mui/material';
import _ from 'lodash';
import { PropTypes } from 'prop-types';

import { getUsers } from '../../../ducks/user/selectors';

function AllUsers({ users, getUsers }) {
  useEffect(() => {
    if (_.isEmpty(users)) getUsers();
  }, []);

  return (
    <Card sx={{ height: '100%', margin: '10px', padding: '10px' }}>
      AllUsers {console.log('user: ', users)}
    </Card>
  );
}

const mapStateToProps = (state) => ({
  users: getUsers(state),
});

const mapDispatchToProps = {
  getUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers);

AllUsers.propTypes = {
  users: PropTypes.array,
  getUsers: PropTypes.func,
};
