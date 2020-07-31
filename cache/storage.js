import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

function addObject(key, obj) {
  return AsyncStorage.setItem(key, JSON.stringify(obj));
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

function getLesson(id) {
  return getObject(`LESSON_${id}`);
}

function getModule(id) {
  return getObject(`MODULE_${id}`);
}

function getNextVisit() {
  return getObject(`NEXT_VISIT`);
}

function use(getFn, id) {
  const [value, setValue] = useState({});
  useEffect(() => {
    getFn(id).then((data) => {
      setValue(data || {});
    });
  }, []);
  return [value, setValue];
}

export default {
  addLesson: (lesson) => addObject(`LESSON_${lesson.id}`, lesson),
  addModule: (module) => addObject(`MODULE_${module.id}`, module),
  setNextVisit: (visit) => addObject('NEXT_VISIT', visit),
  getLesson,
  getModule,
  getNextVisit,
  useLesson: (id) => use(getLesson, id),
  useModule: (id) => use(getModule, id),
  useNextVisit: () => use(getNextVisit),
};
