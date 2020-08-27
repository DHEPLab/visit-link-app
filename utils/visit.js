import moment from 'moment';

// (hours)
const dailyDeadlineForVisit = 20;

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

  // return range start with default time 10:00 AM
  return range[0] + 'T10:00';
}

function defaultStartingRange() {
  const now = moment();
  if (now.hour() > dailyDeadlineForVisit) {
    now.date(now.date() + 1);
  }
  return formatDate(now);
}

function meridiem(momentInstance) {
  const hour = momentInstance.hour();
  const minute = momentInstance.minute();
  if (hour < 9) {
    return '早上';
  } else if (hour < 11 && minute < 30) {
    return '上午';
  } else if (hour < 13 && minute < 30) {
    return '中午';
  } else if (hour < 18) {
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
  // I can start the home visit from 8 o 'clock to 20 o 'clock on the day of the home visit
  canIStart(status, visitTime) {
    if (status !== 'NOT_STARTED') return false;
    const now = moment();
    return (
      moment(formatDate(now)).isSame(formatDate(moment(visitTime))) &&
      now.hour() >= 8 &&
      now.hour() < dailyDeadlineForVisit
    );
  },
  disabledVisitButton(now, selected) {
    if (moment(formatDate(now)).isSame(selected)) {
      return moment(now).hour() > dailyDeadlineForVisit;
    }
    return moment(formatDate(now)).isAfter(selected);
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
};
