import { useState, useEffect } from 'react';
import Http from './http';

export function useFetch(url, params, initialState = {}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(initialState);

  function load() {
    setLoading(true);
    Http.get(url, {
      params,
    })
      .then((r) => setData(r))
      .finally((_) => setLoading(false));
  }

  useEffect(load, []);
  return [data, load, loading];
}

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
