import storage from "./storage";
import http from "../utils/http";

export async function uploadOfflineBabies() {
  const offlineBabies = (await storage.getOfflineBabies()) || [];
  storage.setOfflineBabies([]);
  offlineBabies.forEach((babyInfo) => {
    createBaby(babyInfo);
  });
}

async function createBaby(babyInfo) {
  await http.post("/api/babies", { ...babyInfo });
}

export async function uploadOfflineVisits() {
  const offlineVisits = (await storage.getOfflineVisits()) || [];
  clearVisitsStorage();
  offlineVisits.forEach((offlineVisit) => {
    createVisit(offlineVisit);
  });
}

async function createVisit(offlineVisit) {
  await http.post("/api/visits", offlineVisit);
}

function clearVisitsStorage() {
  storage.setOfflineVisits([]);
}
