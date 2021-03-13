import React, { useReducer, useEffect } from 'react';
import { REQUEST, ERROR, GET_DATA } from './constants';
import axios from 'axios';

const BASE_URL = `https://jobs.github.com/positions.json`;

const reducer = (state, action) => {
  switch (action.type) {
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
  // * the second param is just the initial state
  const [state, dispatch] = useReducer(reducer, { jobs: [], loading: true });

  useEffect(() => {
    dispatch({ type: REQUEST });

    axios
      .get(BASE_URL, {
        params: { markdown: true, page: page, ...params },
      })
      .then((res) => {
        dispatch({
          type: GET_DATA,
          payload: {
            jobs: res.data,
          },
        });
      })
      .catch((e) => {
        dispatch({ type: ERROR, payload: { error: e } });
      });
  }, [params, page]);

  return state;
};

export default useFetchJobs;
