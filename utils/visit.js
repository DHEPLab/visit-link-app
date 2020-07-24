import moment from 'moment';

function formatDate(date) {
  return moment(date).format('YYYY-MM-DD');
}

function formatDateCN(date) {
  return moment(date).format('YYYY年MM月DD日');
}

function formatTime(time) {
  return (moment(time).format('LT').includes('AM') ? '上午' : '下午') + moment(time).format('h:mm');
}

function formatDateTime(datetime) {
  return moment(datetime).format('YYYY年MM月DD日/') + formatTime(datetime);
}

function mergeDateAndTime(date, time) {
  return `${formatDate(date)}T${moment(time).format('HH:mm')}`;
}

export default {
  canBegin(status, visitTime) {
    if (status !== 'NOT_STARTED') return false;
    return moment(formatDate(moment())).isSame(formatDate(moment(visitTime)));
  },
  formatDate,
  formatTime,
  formatDateTime,
  formatDateCN,
  mergeDateAndTime,
};
