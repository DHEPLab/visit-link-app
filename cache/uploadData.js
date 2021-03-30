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

export function uploadOfflineVisits () {
  storage.getOfflineVisits().then((offlineVisits) => {
    offlineVisits && offlineVisits.forEach((offlineVisit, index) => {
      http.post('/api/visits', offlineVisit)
        .then(() => {
          if (index === (offlineVisits.length-1)) {
            clearVisitsStorage(offlineVisits)
          }
        })
        .catch(_ => {})
        .finally(() => {})
      })
    })
  }

  function clearVisitsStorage (list) {
    list.forEach((offlineVisit) => {
      storage.addOfflineVisit(offlineVisit.babyId, {})
    })
    storage.setOfflineVisits([])
  }
