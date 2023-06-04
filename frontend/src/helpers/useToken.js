import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { GetAuthToken } from '../ducks/token/operations';
import { getToken } from '../ducks/token/selectors';

const useToken = () =>
  // Uncomment to send token request
  // const token = useSelector(getToken);
  // const dispatch = useDispatch();
  //
  // useEffect(() => {
  //   if (!token) dispatch(GetAuthToken());
  // }, []);
  //
  // return { token };
  'fake_token';
export default useToken;
