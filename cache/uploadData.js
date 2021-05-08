import storage from './storage'
import http from '../utils/http'

export function uploadOfflineBabies () {
  storage.getOfflineBabies().then(res => {
    const offlineBabies = res || []
    offlineBabies.forEach((babyInfo, index) => {
      http.post('/api/babies', {...babyInfo})
        .then(() => {
          if (index === offlineBabies.length - 1) {
            storage.setOfflineBabies([])
          }
        })
        .finally(() => {})
    });
  })
}

export async function uploadOfflineVisits () {
  const offlineVisits = await storage.getOfflineVisits() || []
  clearVisitsStorage()
  offlineVisits.forEach(offlineVisit => {
    createVisit(offlineVisit)
  })
}

async function createVisit (offlineVisit) {
  await http.post('/api/visits', offlineVisit)
}

  function clearVisitsStorage () {
    storage.setOfflineVisits([])
  }
