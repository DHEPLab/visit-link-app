import Visit from './visit';

it('should can begin visit', () => {
  jest.spyOn(Date, 'now').mockImplementation(() => new Date('2020-07-07'));
  expect(Visit.canBegin('NOT_STARTED', '2020-07-07T10:00:00')).toBeTruthy();
});

it('should format visit time cn', () => {
  expect(Visit.formatDateTimeCN('2020-07-12T11:11:00')).toBe('2020年07月12日/中午11:11');
});

it('should format visit date cn', () => {
  expect(Visit.formatDateCN(new Date('2020-07-12 11:11'))).toBe('2020年07月12日');
});

it('should format visit date', () => {
  expect(Visit.formatDate(new Date('2020-07-12 11:11'))).toBe('2020-07-12');
});

it('should format visit date time', () => {
  expect(Visit.formatDateTime(new Date('2020-07-12 11:11'))).toBe('2020-07-12T11:11');
});

it('should merge date and time', () => {
  expect(Visit.mergeDateAndTime(new Date('2020-07-12 11:11'), new Date('2020-07-12 18:00'))).toBe(
    '2020-07-12T18:00'
  );
});

it('should default datetime is visit time', () => {
  expect(Visit.defaultDatetime([], '2020-07-12')).toBe('2020-07-12');
  expect(Visit.defaultDatetime(['2020-07-11', '2020-07-13'], '2020-07-12')).toBe('2020-07-12');
  expect(Visit.defaultDatetime(['2020-07-11'], '2020-07-12')).toBe('2020-07-12');
});

it('should default datetime is range0', () => {
  expect(Visit.defaultDatetime(['2020-07-28', '2020-08-13'], '2020-07-26')).toBe(
    '2020-07-28T10:00'
  );
});

it('should visit status done is truthy', () => {
  expect(Visit.statusDone('DONE')).toBeTruthy();
});

it('should visit status undone is truthy', () => {
  expect(Visit.statusUndone('UNDONE')).toBeTruthy();
});

it('should visit status not started is truthy', () => {
  expect(Visit.statusNotStart('NOT_STARTED')).toBeTruthy();
});

it('should return visit remark title', () => {
  expect(Visit.remarkTitle('NOT_STARTED')).toBe('备注');
  expect(Visit.remarkTitle('EXPIRED')).toBe('过期原因');
  expect(Visit.remarkTitle('UNDONE')).toBe('未完成原因');
});
