import { useEffect, useState } from 'react';

import { GetExercise } from 'ducks/exercises/operations';
import useToken from 'helpers/useToken';
import { useDispatch } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';

const useExerciseData = () => {
  const [searchParams] = useSearchParams();
  const { id: editedExerciseId } = useParams();
  const id = searchParams.get('id');
  const foundExerciseId = id || editedExerciseId;
  const [exercise, setExercise] = useState({});
  const dispatch = useDispatch();
  const { token } = useToken();

  useEffect(() => {
    foundExerciseId && dispatch(GetExercise(foundExerciseId, token, setExercise));
  }, [id, editedExerciseId]);

  return {
    id: foundExerciseId,
    exercise,
  };
};

export default useExerciseData;