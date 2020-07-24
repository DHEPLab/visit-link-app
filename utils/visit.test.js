import Visit from './visit';

it('should can begin visit', () => {
  jest.spyOn(Date, 'now').mockImplementation(() => new Date('2020-07-07'));
  expect(Visit.canBegin('NOT_STARTED', '2020-07-07T10:00:00')).toBeTruthy();
});

it('should format visit time', () => {
  expect(Visit.formatDateTime(new Date('2020-07-12 11:11'))).toBe('2020年07月12日/上午11:11');
});

it('should format visit date cn', () => {
  expect(Visit.formatDateCN(new Date('2020-07-12 11:11'))).toBe('2020年07月12日');
});

it('should merge date and time', () => {
  expect(Visit.mergeDateAndTime(new Date('2020-07-12 11:11'), new Date('2020-07-12 18:00'))).toBe(
    '2020-07-12T18:00'
  );
});
