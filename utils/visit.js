import moment from 'moment';

function formatDate(date) {
  return moment(date).format('YYYY-MM-DD');
}

function formatTime(time) {
  return (moment(time).format('LT').includes('AM') ? '上午' : '下午') + moment(time).format('h:mm');
}

function formatDateTime(datetime) {
  return moment(datetime).format('YYYY年MM月DD日/') + formatTime(datetime);
}

export default {
  canBeign(status, visitTime) {
    if (status !== 'NOT_STARTED') return false;
    return moment(formatDate(moment())).isSame(formatDate(moment(visitTime)));
  },
  formatDate,
  formatTime,
  formatDateTime,
};
