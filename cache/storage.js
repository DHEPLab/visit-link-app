import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

async function getObject(key) {
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

export default {
  addLesson: (lesson) => {
    return AsyncStorage.setItem(`LESSON_${lesson.id}`, JSON.stringify(lesson));
  },
  getLesson,
  useLesson: (id) => {
    const [value, setValue] = useState({});
    useEffect(() => {
      getLesson(id).then((data) => {
        setValue(data || {});
      });
    }, []);
    return [value, setValue];
  },
  addModule: (module) => {
    return AsyncStorage.setItem(`MODULE_${module.id}`, JSON.stringify(module));
  },
  getModule: (id) => {
    return getObject(`MODULE_${id}`);
  },
  setNextVisit: (visit) => {
    return AsyncStorage.setItem('NEXT_VISIT', JSON.stringify(visit));
  },
  getNextVisit: () => {
    return getObject(`NEXT_VISIT`);
  },
};
