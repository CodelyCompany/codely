const GET_ALL_EXERCISES_SUCCESS = 'GET_ALL_EXERCISES_SUCCESS';
const GET_ALL_EXERCISES_REQUEST = 'GET_ALL_EXERCISES_REQUEST';
const GET_ALL_EXERCISES_FAILURE = 'GET_ALL_EXERCISES_FAILURE';

const GET_EXERCISES_SUCCESS = 'GET_EXERCISES_SUCCESS';
const GET_EXERCISES_REQUEST = 'GET_EXERCISES_REQUEST';
const GET_EXERCISES_FAILURE = 'GET_EXERCISES_FAILURE';

const GET_EXERCISE_REQUEST = 'GET_EXERCISE_REQUEST';
const GET_EXERCISE_SUCCESS = 'GET_EXERCISE_SUCCESS';
const GET_EXERCISE_FAILURE = 'GET_EXERCISE_FAILURE';

const POST_EXERCISE_SUCCESS = 'POST_EXERCISE_SUCCESS';
const POST_EXERCISE_REQUEST = 'POST_EXERCISE_REQUEST';
const POST_EXERCISE_FAILURE = 'POST_EXERCISE_FAILURE';

const DELETE_EXERCISE_REQUEST = 'DELETE_EXERCISE_REQUEST';
const DELETE_EXERCISE_SUCCESS = 'DELETE_EXERCISE_SUCCESS';
const DELETE_EXERCISE_FAILURE = 'DELETE_EXERCISE_FAILURE';

const DELETE_UNCHECKED_EXERCISE_REQUEST = 'DELETE_UNCHECKED_EXERCISE_REQUEST';
const DELETE_UNCHECKED_EXERCISE_SUCCESS = 'DELETE_UNCHECKED_EXERCISE_SUCCESS';
const DELETE_UNCHECKED_EXERCISE_FAILURE = 'DELETE_UNCHECKED_EXERCISE_FAILURE';

const UPDATE_EXERCISE_REQUEST = 'UPDATE_EXERCISE_REQUEST';
const UPDATE_EXERCISE_SUCCESS = 'UPDATE_EXERCISE_SUCCESS';
const UPDATE_EXERCISE_FAILURE = 'UPDATE_EXERCISE_FAILURE';

// type for update exercise action to avoid collision with
// update actions used for saving each step of form
const UPDATE_ENTIRE_EXERCISE_REQUEST = 'UPDATE_ENTIRE_EXERCISE_REQUEST';
const UPDATE_ENTIRE_EXERCISE_SUCCESS = 'UPDATE_ENTIRE_EXERCISE_SUCCESS';
const UPDATE_ENTIRE_EXERCISE_FAILURE = 'UPDATE_ENTIRE_EXERCISE_FAILURE';

const GET_EXERCISES_TO_CHECK_REQUEST = 'GET_EXERCISES_TO_CHECK_REQUEST';
const GET_EXERCISES_TO_CHECK_SUCCESS = 'GET_EXERCISES_TO_CHECK_SUCCESS';
const GET_EXERCISES_TO_CHECK_FAILURE = 'GET_EXERCISES_TO_CHECK_FAILURE';

const PUT_CHECK_EXERCISE_REQUEST = 'PUT_CHECK_EXERCISE_REQUEST';
const PUT_CHECK_EXERCISE_SUCCESS = 'PUT_CHECK_EXERCISE_SUCCESS';
const PUT_CHECK_EXERCISE_FAILURE = 'PUT_CHECK_EXERCISE_FAILURE';

const POST_VERIFY_SOLUTION_REQUEST = 'POST_VERIFY_SOLUTION_REQUEST';
const POST_VERIFY_SOLUTION_SUCCESS = 'POST_VERIFY_SOLUTION_SUCCESS';
const POST_VERIFY_SOLUTION_FAILURE = 'POST_VERIFY_SOLUTION_FAILURE';

export const types = {
  GET_ALL_EXERCISES_REQUEST,
  GET_ALL_EXERCISES_SUCCESS,
  GET_ALL_EXERCISES_FAILURE,
  GET_EXERCISES_REQUEST,
  GET_EXERCISES_SUCCESS,
  GET_EXERCISES_FAILURE,
  GET_EXERCISE_REQUEST,
  GET_EXERCISE_SUCCESS,
  GET_EXERCISE_FAILURE,
  POST_EXERCISE_REQUEST,
  POST_EXERCISE_SUCCESS,
  POST_EXERCISE_FAILURE,
  DELETE_EXERCISE_REQUEST,
  DELETE_EXERCISE_SUCCESS,
  DELETE_EXERCISE_FAILURE,
  UPDATE_EXERCISE_REQUEST,
  UPDATE_EXERCISE_SUCCESS,
  UPDATE_EXERCISE_FAILURE,
  UPDATE_ENTIRE_EXERCISE_REQUEST,
  UPDATE_ENTIRE_EXERCISE_SUCCESS,
  UPDATE_ENTIRE_EXERCISE_FAILURE,
  GET_EXERCISES_TO_CHECK_REQUEST,
  GET_EXERCISES_TO_CHECK_SUCCESS,
  GET_EXERCISES_TO_CHECK_FAILURE,
  PUT_CHECK_EXERCISE_FAILURE,
  PUT_CHECK_EXERCISE_SUCCESS,
  PUT_CHECK_EXERCISE_REQUEST,
  DELETE_UNCHECKED_EXERCISE_REQUEST,
  DELETE_UNCHECKED_EXERCISE_SUCCESS,
  DELETE_UNCHECKED_EXERCISE_FAILURE,
  POST_VERIFY_SOLUTION_REQUEST,
  POST_VERIFY_SOLUTION_SUCCESS,
  POST_VERIFY_SOLUTION_FAILURE,
};
