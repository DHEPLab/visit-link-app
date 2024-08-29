import { useState, useEffect } from "react";
import Http from "./http";

export function calenderMarkedDates(markedDates) {
  const _markedDates = {};
  markedDates.forEach((datum) => {
    _markedDates[datum] = {
      marked: true,
    };
  });
  return _markedDates;
}

export function useFetch(url, params, initialState = {}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(initialState);

  function load(search = {}) {
    setLoading(true);
    Http.get(url, { ...params, ...search })
      .then((r) => setData(r))
      .catch((_) => setData(initialState))
      .finally((_) => setLoading(false));
  }

  useEffect(load, []);
  return [data, load, loading];
}

export function useFetchArray(url, params) {
  return useFetch(url, params, []);
}

export function useManualFetch(url, params, initialState = {}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(initialState);

  function load(search = {}) {
    setLoading(true);
    Http.get(url, { ...params, ...search })
      .then((r) => setData(r))
      .finally((_) => setLoading(false));
  }

  return [data, load, loading];
}

export function useManualFetchArray(url, params) {
  return useManualFetch(url, params, []);
}

/**
 * A custom hook that manages a boolean state with toggling functionality.
 *
 * @param {boolean} [initialState=false] - The initial state value for the boolean. Defaults to `false` if not provided.
 *
 * @returns {[boolean, () => void, () => void]} - An array containing:
 *   - The current boolean state.
 *   - A function to set the state to `true`.
 *   - A function to set the state to `false`.
 */
export function useBoolState(initialState = false) {
  const [bool, setBool] = useState(initialState);
  const setBoolTrue = () => {
    setBool(true);
  };
  const setBoolFalse = () => {
    setBool(false);
  };
  return [bool, setBoolTrue, setBoolFalse];
}
