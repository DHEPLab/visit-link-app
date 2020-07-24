import Visit from './visit';

it('should can begin visit', () => {
  jest.spyOn(Date, 'now').mockImplementation(() => new Date('2020-07-07'));
  expect(Visit.canBeign('NOT_STARTED', '2020-07-07T10:00:00')).toBeTruthy();
});

it('should format visit time', () => {
  expect(Visit.formatDateTime(new Date('2020-07-12 11:11'))).toBe('2020年07月12日/上午11:11');
});
