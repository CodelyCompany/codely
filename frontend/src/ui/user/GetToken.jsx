import { useEffect } from 'react';

import { GetAuthToken } from 'ducks/token/operations';
import { getToken } from 'ducks/token/selectors';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

function GetToken({ token, GetAuthToken }) {
  useEffect(() => {
    // uncomment to get tokens
    // if (!token) GetAuthToken();
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
