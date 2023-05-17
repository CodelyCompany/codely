import { useEffect, useState } from 'react';

import { GetExercise } from 'ducks/exercises/operations';
import useToken from 'helpers/useToken';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

const useExerciseData = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const [exercise, setExercise] = useState({});
  const dispatch = useDispatch();
  const { token } = useToken();

  useEffect(() => {
    id && dispatch(GetExercise(id, token, setExercise));
  }, [id]);

  return {
    id,
    exercise,
  };
};

export default useExerciseData;