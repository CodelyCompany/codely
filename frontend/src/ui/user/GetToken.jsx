import React, { useEffect } from 'react';

import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import { GetAuthToken } from '../../ducks/token/operations';
import { getToken } from '../../ducks/token/selectors';

function GetToken({ token, GetAuthToken }) {
  useEffect(() => {
    GetAuthToken();
  }, []);
}

const mapStateToProps = (state) => ({
  token: getToken(state),
});

const mapDispatchToProps = {
  GetAuthToken,
};

export default connect(mapStateToProps, mapDispatchToProps)(GetToken);

GetToken.propTypes = {
  token: PropTypes.string,
  GetAuthToken: PropTypes.func,
};
