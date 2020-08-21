import module, { Component } from './module';

it('should create page components', () => {
  const components = [
    new Component('Text', 1596027303992),
    new Component('PageFooter', 1596420572527),
    new Component('Media', 1596027723356),
    new Component('PageFooter', 1596420574082),
    new Component('Text', 1596027758880),
    new Component('Switch', 1596419337285),
  ];

  expect(module.pageable(components)).toStrictEqual([
    [new Component('Text', 1596027303992), new Component('PageFooter', 1596420572527)],
    [new Component('Media', 1596027723356), new Component('PageFooter', 1596420574082)],
    [new Component('Text', 1596027758880), new Component('Switch', 1596419337285)],
  ]);
});
