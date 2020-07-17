import { formatVisitTime } from './index';

test('shoud format visit time', () => {
  expect(formatVisitTime(new Date('2020-07-12 11:11'))).toBe('2020年07月12日/上午11:11');
});
