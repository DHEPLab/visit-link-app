import * as FileSystem from "expo-file-system";

import Config from "../constants/Config";

const { apiHost } = Config;

export function downloadFromOSS(filename) {
  return FileSystem.downloadAsync(
    `${apiHost}/api/files${filename}`,
    `${FileSystem.documentDirectory}${filename}`,
  );
}
