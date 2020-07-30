import storage from './storage';

it('should add lesson to storage', async () => {
  storage.addLesson({ id: 1, name: 'Lesson1' });
  expect(await storage.getLesson(1)).toStrictEqual({ id: 1, name: 'Lesson1' });
});

it('should add module to storage', async () => {
  storage.addModule({ id: 2, name: 'Module1' });
  expect(await storage.getModule(2)).toStrictEqual({ id: 2, name: 'Module1' });
});

it('should return null', async () => {
  expect(await storage.getModule(3)).toBeNull();
});
