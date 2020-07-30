import * as fs from './fs';

export default async function sync() {
  try {
    const { uri } = await fs.downloadFromOSS('/b60f539bf2f9499baf2f5986832f3c75.jpg');
    console.log('Finished downloading to ', uri);
  } catch (error) {
    console.error(error);
  } finally {
  }
}
