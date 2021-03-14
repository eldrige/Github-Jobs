import React, { useReducer, useEffect } from 'react';
import { REQUEST, ERROR, GET_DATA } from './constants';
import axios from 'axios';

const BASE_URL = `https://jobs.github.com/positions.json`;
// const proxy = `https://cors-anywhere.herokuapp.com/`;

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
    const cancelToken = axios.CancelToken.source();

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
        if (axios.isCancel(e)) return;
        dispatch({ type: ERROR, payload: { error: e } });
      });

    return () => {
      cancelToken.cancel();
    };
  }, [params, page]);

  return state;
};

export default useFetchJobs;
