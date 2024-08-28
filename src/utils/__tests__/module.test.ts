import module, { Component, Case, SwitchValue, TextValue } from "../module";

it("should create page components", () => {
  const components = [
    new Component("Text", 1596027303992),
    new Component("PageFooter", 1596420572527),
    new Component("Media", 1596027723356),
    new Component("PageFooter", 1596420574082),
    new Component("Text", 1596027758880),
    new Component("Switch", 1596419337285),
  ];

  expect(module.pageable(components)).toStrictEqual([
    [
      new Component("Text", 1596027303992),
      new Component("PageFooter", 1596420572527),
    ],
    [
      new Component("Media", 1596027723356),
      new Component("PageFooter", 1596420574082),
    ],
    [
      new Component("Text", 1596027758880),
      new Component("Switch", 1596419337285),
    ],
  ]);
});

it("should recursive page case components", () => {
  const components = [
    new Component(
      "Switch",
      1,
      new SwitchValue(new TextValue(), [
        new Case(
          11,
          "Level 1 Case 1",
          ["Continue"],
          [
            new Component(
              "Switch",
              111,
              new SwitchValue(new TextValue(), [
                new Case(1111, "Level 2 Case 1", ["Continue"], []),
              ]),
            ),
            new Component("Text", 112),
          ],
        ),
        new Case(
          12,
          "Level 1 Case 2",
          ["Continue"],
          [
            new Component(
              "Switch",
              121,
              new SwitchValue(new TextValue(), [
                new Case(1211, "Level 2 Case 1", ["Continue"], []),
              ]),
            ),
            new Component("Text", 122),
          ],
        ),
      ]),
    ),
  ];

  const case11 = new Case(11, "Level 1 Case 1", ["Continue"], []);
  const case1111 = new Case(1111, "Level 2 Case 1", ["Continue"], []);
  case1111.pageComponents = [];
  case11.pageComponents = [
    [
      new Component(
        "Switch",
        111,
        new SwitchValue(new TextValue(), [case1111]),
      ),
    ],
    [new Component("Text", 112)],
  ];
  const case12 = new Case(12, "Level 1 Case 2", ["Continue"], []);
  const case1211 = new Case(1211, "Level 2 Case 1", ["Continue"], []);
  case1211.pageComponents = [];
  case12.pageComponents = [
    [
      new Component(
        "Switch",
        121,
        new SwitchValue(new TextValue(), [case1211]),
      ),
    ],
    [new Component("Text", 122)],
  ];
  expect(module.pageable(components)).toStrictEqual([
    [
      new Component(
        "Switch",
        1,
        new SwitchValue(new TextValue(), [case11, case12]),
      ),
    ],
  ]);
});
