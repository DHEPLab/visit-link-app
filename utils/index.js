import { useState, useEffect } from 'react';
import Http from './http';

export function useFetch(url, params, initialState = {}) {
  const [data, setData] = useState(initialState);

  function load() {
    Http.get(url, {
      params,
    }).then((r) => setData(r));
  }

  useEffect(load, []);
  return [data, load];
}
