import { useState, useEffect } from 'react';
import Http from './http';
import moment from 'moment';

export function formatVisitTime(date) {
  return (
    moment(date).format('YYYY年MM月DD日/') +
    (moment(date).format('LT').includes('AM') ? '上午' : '下午') +
    moment(date).format('h:mm')
  );
}

export function useFetch(url, params, initialState = {}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(initialState);

  function load(search = {}) {
    setLoading(true);
    Http.get(url, { ...params, ...search })
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
