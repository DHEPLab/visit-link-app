import { formatVisitTime, calenderMarkedDates } from './index';

test('should format visit time', () => {
  expect(formatVisitTime(new Date('2020-07-12 11:11'))).toBe('2020年07月12日/上午11:11');
});

test('should return calendar marked dates', () => {
  const markedDates = ['2020-01-01', '2020-02-02'];
  expect(calenderMarkedDates(markedDates)).toStrictEqual({
    '2020-01-01': {
      marked: true,
    },
    '2020-02-02': {
      marked: true,
    },
  });
});
