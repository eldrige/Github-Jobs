import React, { useReducer } from 'react';
import { REQUEST, ERROR, GET_DATA } from './constants';

const reducer = (state, action) => {
  switch ((action, type)) {
    case REQUEST:
      return { loading: true, jobs: [] };
    case GET_DATA:
      return { ...state, loading: false, jobs: action.payload.jobs };
    case ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        jobs: [],
      };
    default:
      return state;
  }
};

const useFetchJobs = (params, page) => {
  const [state, dispatch] = useReducer(reducer, { jobs: [], loading: true });

  return {
    jobs: [],
    loading: false,
    error: false,
  };
};

export default useFetchJobs;
