import { renderHook } from '@testing-library/react-hooks';
import { waitFor } from 'react-native-testing-library';

import Visits from '../utils/visit';
import storage from './storage';

it('should add lesson to storage and useLesson', async () => {
  storage.addLesson({ id: 1, name: 'Lesson1' });
  const { result } = renderHook(() => storage.useLesson(1));
  await waitFor(() => {
    const [lesson] = result.current;
    expect(lesson).toStrictEqual({ id: 1, name: 'Lesson1' });
  });
});

it('should add module to storage', async () => {
  storage.addModule({ id: 2, name: 'Module1' });
  const { result } = renderHook(() => storage.useModule(2));
  await waitFor(() => {
    const [module] = result.current;
    expect(module).toStrictEqual({ id: 2, name: 'Module1' });
  });
});

it('should set next visit to storage', async () => {
  storage.setNextVisit({ id: 3, name: 'Next Visit' });
  const { result } = renderHook(() => storage.useNextVisit());
  await waitFor(() => {
    const [visit] = result.current;
    expect(visit).toStrictEqual({ id: 3, name: 'Next Visit' });
  });
});

it('should return null', async () => {
  expect(await storage.getModule(3)).toBeNull();
});

it('should set next module index', async () => {
  storage.setNextModule(1);
  const { result } = renderHook(() => storage.useNextModule());
  await waitFor(() => {
    const [nextModule] = result.current;
    expect(nextModule).toBe(1);
  });
});

it('should save visit status', async () => {
  await storage.setUncommittedVisitStatus(
    1,
    'UNDONE',
    Visits.formatDateTime(new Date('2020-01-01T10:00:00'))
  );
  await storage.setUncommittedVisitStatus(2, 'DONE');
  const { result } = renderHook(() => storage.useUncommittedVisitStatus());
  await waitFor(() => {
    const [status] = result.current;
    expect(status).toStrictEqual({
      1: { status: 'UNDONE', startTime: '2020-01-01T10:00:00' },
      2: { status: 'DONE' },
    });
  });
});

it('should set last update at', async () => {
  storage.setLastUpdateAt(new Date('2020-07-12 11:11'));
  return storage.getLastUpdateAt().then((at) => {
    expect(at).toBe('2020-07-12T11:11:00');
  });
});
