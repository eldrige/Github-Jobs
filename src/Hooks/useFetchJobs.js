import { useReducer, useEffect } from 'react';
import { REQUEST, ERROR, GET_DATA, UPDATE_HAS_NEXT_PAGE } from '../constants';
import axios from 'axios';

const BASE_URL = `https:api.allorigins.win/raw?url=https://jobs.github.com/positions.json`;

// const proxies = [
//   `https://cors-anywhere.herokuapp.com/`,
//   ` https:api.allorigins.win/raw?url=`,
//   `https:thingproxy.freeboard.io/fetch/`,
// ];

// const proxy = `https:thingproxy.freeboard.io/fetch/`;

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
    case UPDATE_HAS_NEXT_PAGE:
      return {
        ...state,
        hasNextPage: action.payload.hasNextPage,
      };
    default:
      return state;
  }
};

const useFetchJobs = (params, page) => {
  // * the second param is just the initial state
  const [state, dispatch] = useReducer(reducer, { jobs: [], loading: true });

  useEffect(() => {
    //? this is so as to cancel the last requests, when our params change
    const cancelToken1 = axios.CancelToken.source();

    dispatch({ type: REQUEST });

    axios
      .get(BASE_URL, {
        params: { markdown: true, page: page, ...params },
        headers: { 'Access-Control-Allow-Origin': '*' },
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

    const cancelToken2 = axios.CancelToken.source();
    axios
      .get(BASE_URL, {
        params: { markdown: true, page: page + 1, ...params },
        headers: { 'Access-Control-Allow-Origin': '*' },
      })
      .then((res) => {
        dispatch({
          type: UPDATE_HAS_NEXT_PAGE,
          payload: {
            hasNextPage: res.data.length !== 0,
          },
        });
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        dispatch({ type: ERROR, payload: { error: e } });
      });

    return () => {
      cancelToken1.cancel();
      cancelToken2.cancel();
    };
  }, [params, page]);

  return state;
};

export default useFetchJobs;
