import AsyncStorage from '@react-native-community/async-storage';

async function getObject(key) {
  const json = await AsyncStorage.getItem(key);
  return json ? JSON.parse(json) : null;
}

export default {
  addLesson: async (lesson) => {
    await AsyncStorage.setItem(`LESSON_${lesson.id}`, JSON.stringify(lesson));
  },
  getLesson: async (id) => {
    return await getObject(`LESSON_${id}`);
  },
  addModule: async (module) => {
    await AsyncStorage.setItem(`MODULE_${module.id}`, JSON.stringify(module));
  },
  getModule: async (id) => {
    return await getObject(`MODULE_${id}`);
  },
  setNextVisit: async (visit) => {
    await AsyncStorage.setItem('NEXT_VISIT', JSON.stringify(visit));
  },
  getNextVisit: async () => {
    return await getObject(`NEXT_VISIT`);
  },
};
