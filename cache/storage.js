import AsyncStorage from '@react-native-community/async-storage';

export default {
  addLesson: async (lesson) => {
    await AsyncStorage.setItem(`LESSON_${lesson.id}`, JSON.stringify(lesson));
  },
  getLesson: async (id) => {
    const json = await AsyncStorage.getItem(`LESSON_${id}`);
    return json ? JSON.parse(json) : null;
  },
  addModule: async (module) => {
    await AsyncStorage.setItem(`MODULE_${module.id}`, JSON.stringify(module));
  },
  getModule: async (id) => {
    const json = await AsyncStorage.getItem(`MODULE_${id}`);
    return json ? JSON.parse(json) : null;
  },
};
