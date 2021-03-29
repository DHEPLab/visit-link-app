const colors = ['#FF9472', '#F2709C'];

export default {
  primary: '#FF794F',
  colors,
  linearGradient: {
    start: [0, 0],
    end: [1, 1],
    colors,
  },
  theme: {
    dark: false,
    colors: {
      primary: '#ff794f',
      background: '#eeeeee',
      card: 'rgb(255, 255, 255)',
      text: 'rgb(28, 28, 30)',
      border: 'rgb(199, 199, 204)',
    },
  },
  moduleStatus: {
    DONE: '#FF794F',
    UNDONE: '#F2709C',
  },
  moduleStatusBorder: {
    DONE: '#FFEDE2',
    UNDONE: '#FCD4E2',
  },
  visitStatus: {
    NOT_SUBMIT: '#ACB0B7',
    NOT_STARTED: '#F2709C',
    UNDONE: '#FF2E2E',
    EXPIRED: '#B2B2B2',
    DONE: '#FF794F',
  },
  visitStatusBorder: {
    NOT_SUBMIT: '#E7E7E7',
    NOT_STARTED: '#FCD4E2',
    UNDONE: '#FFEAEA',
    EXPIRED: '#EEEEEE',
    DONE: '#FFEDE2',
  },
  calendar: {
    backgroundColor: '#ffffff',
    calendarBackground: '#ffffff',
    textSectionTitleColor: '#b6c1cd',
    textSectionTitleDisabledColor: '#d9e1e8',
    selectedDayBackgroundColor: '#F2709C',
    selectedDayTextColor: '#ffffff',
    todayTextColor: '#F2709C',
    dayTextColor: '#2d4150',
    textDisabledColor: '#d9e1e8',
    dotColor: '#F2709C',
    selectedDotColor: '#ffffff',
    arrowColor: '#FF794F',
    disabledArrowColor: '#d9e1e8',
    monthTextColor: '#FF794F',
    indicatorColor: 'blue',
    textDayFontFamily: 'monospace',
    textMonthFontFamily: 'monospace',
    textDayHeaderFontFamily: 'monospace',
    textDayFontWeight: '300',
    textMonthFontWeight: 'bold',
    textDayHeaderFontWeight: '300',
    textDayFontSize: 16,
    textMonthFontSize: 16,
    textDayHeaderFontSize: 16,
  },
  // tintColor,
  // tabIconDefault: '#ccc',
  // tabIconSelected: tintColor,
  // tabBar: '#fefefe',
  // errorBackground: 'red',
  // errorText: '#fff',
  // warningBackground: '#EAEB5E',
  // warningText: '#666804',
  // noticeBackground: tintColor,
  // noticeText: '#fff',
};
