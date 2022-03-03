import moment from 'moment';
import * as Location from 'expo-location';

function defaultDatetime(range, visitTime) {
  if (!visitTime) visitTime = moment();

  if (
    // unlimit range
    !range ||
    !range[0] ||
    // unlimit range end
    (!range[1] && moment(range[0]).isBefore(formatDate(visitTime))) ||
    // limit range
    (moment(range[0]).isBefore(formatDate(visitTime)) &&
      moment(range[1]).isAfter(formatDate(visitTime)))
  ) {
    return visitTime;
  }

  if (moment(formatDate(visitTime)).isSame(range[0])) {
    return visitTime;
  }

  // return range start with default time 08:00 AM
  return range[0] + 'T08:00';
}

function defaultStartingRange() {
  const now = moment();
  return formatDate(now);
}

function meridiem(momentInstance) {
  const hour = momentInstance.hour();
  const minute = momentInstance.minute();
  if (hour <= 9) {
    return '早上';
  } else if (hour <= 11 && minute <= 30) {
    return '上午';
  } else if (hour <= 13 && minute <= 30) {
    return '中午';
  } else if (hour <= 18) {
    return '下午';
  } else {
    return '晚上';
  }
}

function formatDate(date) {
  return moment(date).format('YYYY-MM-DD');
}

function formatDateCN(date) {
  return moment(date).format('YYYY年MM月DD日');
}

function formatTimeCN(time) {
  return meridiem(moment(time)) + moment(time).format('h:mm');
}

function formatDateTime(datetime) {
  return moment(datetime).format('YYYY-MM-DDTHH:mm');
}

function formatDateTimeCN(datetime) {
  if (!datetime) return '';
  return moment(datetime).format('YYYY年MM月DD日/') + formatTimeCN(datetime);
}

function mergeDateAndTime(date, time) {
  return `${formatDate(date)}T${moment(time).format('HH:mm')}`;
}

function statusNotStart(status) {
  return status === 'NOT_STARTED';
}

function statusUndone(status) {
  return status === 'UNDONE';
}

function statusExpired(status) {
  return status === 'EXPIRED';
}

export default {
  canIStart(status, visitTime) {
    if (status !== 'NOT_STARTED') return false;
    const now = moment();
    return (
      moment(formatDate(now)).isSame(formatDate(moment(visitTime)))
    );
  },
  disabledVisitButton(now, selected) {
    return moment(formatDate(now)).isAfter(selected);
  },
  defaultVisitTime(now, selected) {
    if (!selected || moment(formatDate(now)).isSame(selected)) {
      return formatDateTime(now);
    }
    return `${selected}T08:00`;
  },
  formatDate,
  formatDateTime,
  formatTimeCN,
  formatDateTimeCN,
  formatDateCN,
  mergeDateAndTime,
  defaultDatetime,
  statusDone: (status) => status === 'DONE',
  statusUndone,
  statusNotStart,
  statusExpired,
  defaultStartingRange,
  remarkTitle: (status) =>
    statusNotStart(status) ? '备注' : statusUndone(status) ? '未完成原因' : '过期原因',
  visitTimeMayConflict(vt1, vt2) {
    const diff = moment(vt1).diff(moment(vt2), 'minutes')
    return Math.abs(diff) <= 60
  }
};

export function uploadVisitLocation() {
  (async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') return;
    try {
      let location = await Location.getCurrentPositionAsync({
        timeout: 15000,
        maximumAge: 10000
      });
      const { latitude, longitude } = location.coords;
      Http.post('/api/visits/upload/location', {
        babyId, visitId, longitude, latitude
      })
      console.log("get location: ", latitude, longitude)
    } catch (e) {
      console.log('Error while trying to get location: ', e);
    }
  })();
}
