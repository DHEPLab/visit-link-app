import * as fs from './fs';
import storage from './storage';
import http from '../utils/http';
import Modules from '../utils/module';

async function fetchUpdateAsync() {
  try {
    const lessons = await http.get('/api/resources/lessons');
    lessons.forEach(storage.addLesson);
    const { modules, media } = await http.get('/api/resources/modules');
    modules
      .map((module) => ({
        ...module,
        pageComponents: Modules.pageable(module.components),
        components: [],
      }))
      .forEach(storage.addModule);
    media.forEach(async (medium) => {
      if (medium) {
        await fs.downloadFromOSS(medium);
      }
    });
    storage.setLastUpdateAt(new Date());
  } catch (error) {
    console.error(error);
    throw error;
  }
}

function checkForUpdateAsync() {
  return new Promise(async (resolve, reject) => {
    try {
      const lastUpdateAt = await storage.getLastUpdateAt();
      if (!lastUpdateAt) {
        resolve({ isAvailable: true, firstTime: true });
        return;
      }
      const { updated } = await http.get('/api/resources/check-for-updates', {
        lastUpdateAt: lastUpdateAt || '',
      });
      resolve({ isAvailable: updated });
    } catch (e) {
      reject(e);
    }
  });
}

export default {
  checkForUpdateAsync,
  fetchUpdateAsync,
};
