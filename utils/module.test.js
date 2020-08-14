import module from './module';

it('should create page components', () => {
  const components = [
    {
      type: 'Text',
      key: 1596027303992,
    },
    {
      type: 'Text',
      key: 1596027550001,
    },
    {
      type: 'Text',
      key: 1596027640176,
    },
    {
      type: 'Media',
      key: 1596027609008,
    },
    {
      type: 'PageFooter',
      key: 1596420572527,
    },
    {
      type: 'Text',
      key: 1596027665249,
    },
    {
      type: 'Text',
      key: 1596027715921,
    },
    {
      type: 'Media',
      key: 1596027723356,
    },
    {
      type: 'PageFooter',
      key: 1596420574082,
    },
    {
      type: 'Text',
      key: 1596027742984,
    },
    {
      type: 'Text',
      key: 1596027758880,
    },
    {
      type: 'Switch',
      key: 1596419337285,
    },
  ];

  expect(module.pageable(components)).toStrictEqual([
    [
      {
        type: 'Text',
        key: 1596027303992,
      },
      {
        type: 'Text',
        key: 1596027550001,
      },
      {
        type: 'Text',
        key: 1596027640176,
      },
      {
        type: 'Media',
        key: 1596027609008,
      },
      {
        type: 'PageFooter',
        key: 1596420572527,
      },
    ],
    [
      {
        type: 'Text',
        key: 1596027665249,
      },
      {
        type: 'Text',
        key: 1596027715921,
      },
      {
        type: 'Media',
        key: 1596027723356,
      },
      {
        type: 'PageFooter',
        key: 1596420574082,
      },
    ],
    [
      {
        type: 'Text',
        key: 1596027742984,
      },
      {
        type: 'Text',
        key: 1596027758880,
      },
      {
        type: 'Switch',
        key: 1596419337285,
      },
    ],
  ]);
});
