import { useState, useEffect } from 'react';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';

function addObject(key, obj) {
  return AsyncStorage.setItem(key, JSON.stringify(obj));
}

function addValue(key, value) {
  return AsyncStorage.setItem(key, value);
}

function getObject(key) {
  return new Promise(async (resolve, reject) => {
    try {
      const json = await AsyncStorage.getItem(key);
      resolve(json ? JSON.parse(json) : null);
    } catch (e) {
      reject(e);
    }
  });
}

function getValue(key) {
  return new Promise(async (resolve, reject) => {
    try {
      resolve((await AsyncStorage.getItem(key)) || 0);
    } catch (e) {
      reject(e);
    }
  });
}

function getLesson(id) {
  return getObject(`LESSON_${id}`);
}

function getModule(id) {
  return getObject(`MODULE_${id}`);
}

function getNextVisit() {
  return getObject(`NEXT_VISIT`);
}

function getNextModule() {
  return getValue(`NEXT_MODULE`);
}

function getUncommittedVisitStatus() {
  return getObject(`UNCOMMITTED_VISIT_STATUS`);
}

function useString(getFn, id) {
  const [value, setValue] = useState('');
  function load() {
    getFn(id).then((data) => {
      setValue(data || '');
    });
  }
  useEffect(() => {
    load();
  }, []);
  return [value, load];
}

function useNumber(getFn, id) {
  const [value, setValue] = useState(0);
  function load() {
    getFn(id).then((data) => {
      setValue(Number(data) || 0);
    });
  }
  useEffect(() => {
    load();
  }, []);
  return [value, load];
}

function use(getFn, id) {
  const [value, setValue] = useState({});
  function load(_id) {
    getFn(_id || id).then((data) => {
      setValue(data || {});
    });
  }
  useEffect(() => {
    load();
  }, []);
  return [value, load];
}

export default {
  addLesson: (lesson) => addObject(`LESSON_${lesson.id}`, lesson),
  addModule: (module) => addObject(`MODULE_${module.id}`, module),
  setNextVisit: (visit) => addObject('NEXT_VISIT', visit),
  setNextModule: (nextModule) => addValue('NEXT_MODULE', nextModule.toString()),
  setUncommittedVisitStatus: (id, status, startTime) => {
    return new Promise(async (resolve, reject) => {
      try {
        let obj = await getUncommittedVisitStatus();
        obj = obj || {};
        obj[id] = { status, startTime: startTime || obj[id]?.startTime };
        await addObject('UNCOMMITTED_VISIT_STATUS', obj);
        resolve();
      } catch (e) {
        reject();
      }
    });
  },
  committedVisitStatus: () => addObject('UNCOMMITTED_VISIT_STATUS', {}),
  setLastUpdateAt: (datetime) =>
    addValue('LAST_UPDATE_AT', moment(datetime).format('YYYY-MM-DDTHH:mm:ss')),
  getLesson,
  getModule,
  getNextVisit,
  getNextModule,
  getUncommittedVisitStatus,
  getLastUpdateAt: () => getValue('LAST_UPDATE_AT'),
  useLesson: (id) => use(getLesson, id),
  useModule: (id) => use(getModule, id),
  useNextVisit: () => use(getNextVisit),
  useNextModule: () => useNumber(getNextModule),
  useUncommittedVisitStatus: () => use(getUncommittedVisitStatus),
};
