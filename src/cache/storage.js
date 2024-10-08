import { useState, useEffect } from "react";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

function getNextShouldVisit(id) {
  return getObject(`NEXT_VISIT_${id}`);
}

function getNextVisit() {
  return getObject(`NEXT_VISIT`);
}

function getBabies() {
  return getObject(`BABIES`);
}

function getOfflineBabies() {
  return getObject("OFFLINEBABIES");
}

function getOfflineVisits() {
  return getObject("OFFLINE_VISITS");
}

function getAnswers(id) {
  return getObject(`ANSWER_LESSON_${id}`);
}

function getNextModule() {
  return getValue(`NEXT_MODULE`);
}

function getUncommittedVisitStatus() {
  return getObject(`UNCOMMITTED_VISIT_STATUS`);
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

function useWrapper(getFn, id) {
  const [value, setValue] = useState({});
  function load(_id) {
    getFn(_id || id).then((data) => {
      setValue(data || {});
    });
  }
  useEffect(() => {
    load();
  }, []);
  return [value, load, setValue];
}

export default {
  addLesson: (lesson) => addObject(`LESSON_${lesson.id}`, lesson),
  addModule: (module) => addObject(`MODULE_${module.id}`, module),
  addNextShouldVisit: (id, visit) => addObject(`NEXT_VISIT_${id}`, visit),
  setOfflineVisits: (visits) => addObject("OFFLINE_VISITS", visits),
  setBabies: (babies) => addObject("BABIES", babies),
  setOfflineBabies: (babies) => addObject("OFFLINEBABIES", babies),
  setAnswers: (visitId, answer) =>
    addObject(`ANSWER_LESSON_${visitId}`, answer),
  setNextVisit: (visit) => addObject("NEXT_VISIT", visit),
  setNextModule: (nextModule) => addValue("NEXT_MODULE", nextModule.toString()),
  setUncommittedVisitStatus: (id, status, startTime) => {
    return new Promise(async (resolve, reject) => {
      try {
        let obj = await getUncommittedVisitStatus();
        obj = obj || {};
        obj[id] = { status, startTime: startTime || obj[id]?.startTime };
        await addObject("UNCOMMITTED_VISIT_STATUS", obj);
        resolve();
      } catch (e) {
        reject();
      }
    });
  },
  committedVisitStatus: () => addObject("UNCOMMITTED_VISIT_STATUS", {}),
  setLastUpdateAt: (datetime) =>
    addValue("LAST_UPDATE_AT", moment(datetime).format("YYYY-MM-DDTHH:mm:ss")),
  getLesson,
  getModule,
  getNextShouldVisit,
  getOfflineVisits,
  getNextVisit,
  getBabies,
  getOfflineBabies,
  getAnswers,
  getNextModule,
  getUncommittedVisitStatus,
  getLastUpdateAt: () => getValue("LAST_UPDATE_AT"),
  useLesson: (id) => useWrapper(getLesson, id),
  useModule: (id) => useWrapper(getModule, id),
  useNextShouldVisit: (id) => useWrapper(getNextShouldVisit, id),
  useNextVisit: () => useWrapper(getNextVisit),
  useBabies: () => useWrapper(getBabies),
  useOfflineVisits: () => useWrapper(getOfflineVisits),
  useOfflineBabies: () => useWrapper(getOfflineBabies),
  useAnswers: (id) => useWrapper(getAnswers, id),
  useNextModule: () => useNumber(getNextModule),
  useUncommittedVisitStatus: () => useWrapper(getUncommittedVisitStatus),
};
