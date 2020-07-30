import * as FileSystem from 'expo-file-system';

import Config from '../constants/Config';

const { ossHost } = Config;

export function downloadFromOSS(filename) {
  return FileSystem.downloadAsync(
    `${ossHost}${filename}`,
    `${FileSystem.documentDirectory}${filename}`
  );
}
