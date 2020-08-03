import * as fs from './fs';
import storage from './storage';
import http from '../utils/http';
import ModuleUtils from '../utils/module';

export default async function sync() {
  try {
    const lessons = await http.get('/api/resources/lessons');
    lessons.forEach(storage.addLesson);
    const { modules, media } = await http.get('/api/resources/modules');
    modules
      .map((module) => ({
        ...module,
        pageComponents: ModuleUtils.pageable(module.components),
        components: [],
      }))
      .forEach(storage.addModule);

    media.forEach(async (medium) => {
      const { uri } = await fs.downloadFromOSS(medium);
      console.log('Finished downloading to ', uri);
    });
    storage.setLastUpdateAt(new Date());
  } catch (error) {
    console.error(error);
  } finally {
  }
}
