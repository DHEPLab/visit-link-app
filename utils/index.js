import { useState, useEffect } from 'react';
import Http from './http';
import Visit from './visit';

export function formatVisitTime(date) {
  return Visit.formatDateTimeCN(date);
}

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
