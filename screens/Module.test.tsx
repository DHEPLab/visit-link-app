import { useMethods } from './Module';
import { SwitchValue, Component, TextValue, Case } from '../utils/module';

it('should gets the component of the current page', () => {
  const path = [0];
  const module = {
    pageComponents: [[1, 2]],
  };
  const { computed } = useMethods({
    navigation: null,
    params: { id: 1 },
    path,
    setPath: null,
    module,
    reloadModule: null,
  });
  const { components, lastComponent, theLastPage, switchAtTheEnd } = computed();
  expect(components).toStrictEqual([1, 2]);
  expect(lastComponent).toBe(2);
  expect(theLastPage).toBeTruthy();
  expect(switchAtTheEnd).toBeFalsy();
});

it('should turn to the next page', () => {
  let path = [0];
  const setPath = (_path) => (path = _path);
  const { nextStep } = useMethods({
    navigation: null,
    params: { id: 1 },
    path,
    setPath,
    module: {
      pageComponents: [1, 2],
    },
    reloadModule: null,
  });
  nextStep(path);
  expect(path).toStrictEqual([1]);
});

it('should turn to the next page and current in case page components', () => {
  const navigation = {
    navigate: jest.fn(),
  };
  const params = {
    id: 1,
    lessonId: 2,
  };
  let path = [0, '0.value.cases.0', 'pageComponents', 0];
  const _case = new Case(11, 'Level 1 Case 1', ['Continue'], []).setPageComponents([
    [new Component('Text', 111)],
    [new Component('Text', 112)],
  ]);
  const module = {
    pageComponents: [[new Component('Switch', 1, new SwitchValue(new TextValue(), [_case]))], [1]],
  };
  const setPath = (_path) => (path = _path);
  let methods = useMethods({
    navigation,
    params,
    path,
    setPath,
    module,
    reloadModule: null,
  });
  methods.nextStep(path);
  expect(path).toStrictEqual([0, '0.value.cases.0', 'pageComponents', 1]);

  methods = useMethods({
    navigation,
    params,
    path,
    setPath,
    module,
    reloadModule: null,
  });
  methods.nextStep(path);
  expect(path).toStrictEqual([1]);

  methods = useMethods({
    navigation,
    params,
    path,
    setPath,
    module,
    reloadModule: null,
  });
  methods.nextStep(path);
  expect(navigation.navigate).toBeCalledWith('LessonModules', {
    id: 2,
    moduleId: 1,
    finished: true,
  });
});

it('should turn to the previous page', () => {
  let path = [1];
  const setPath = (_path) => (path = _path);
  let methods = useMethods({
    navigation: null,
    params: { id: 1 },
    path,
    setPath,
    module: null,
    reloadModule: null,
  });
  methods.previousStep(path);
  expect(path).toStrictEqual([0]);
});

it('should turn to the previous page and current in case page components', () => {
  const navigation = {
    navigate: jest.fn(),
  };
  const params = {
    id: 1,
    lessonId: 2,
  };
  let path = [1, '0.value.cases.0', 'pageComponents', 1];
  const _case = new Case(11, 'Level 1 Case 1', ['Continue'], []).setPageComponents([
    [new Component('Text', 111)],
    [new Component('Text', 112)],
  ]);
  const module = {
    pageComponents: [[1], [new Component('Switch', 1, new SwitchValue(new TextValue(), [_case]))]],
  };
  const setPath = (_path) => (path = _path);
  let methods = useMethods({
    navigation,
    params,
    path,
    setPath,
    module,
    reloadModule: null,
  });
  methods.previousStep(path);
  expect(path).toStrictEqual([1, '0.value.cases.0', 'pageComponents', 0]);

  methods = useMethods({
    navigation,
    params,
    path,
    setPath,
    module,
    reloadModule: null,
  });
  methods.previousStep(path);
  expect(path).toStrictEqual([1]);
});

it('should change path on change case', () => {
  let path = [0];
  const setPath = (fn) => (path = fn(path));
  const _case = new Case(11, 'Level 1 Case 1', ['Continue'], []).setPageComponents([
    [new Component('Text', 111)],
  ]);
  const module = {
    pageComponents: [[new Component('Switch', 1, new SwitchValue(new TextValue(), [_case]))]],
  };
  const { handleCase } = useMethods({
    navigation: null,
    params: { id: 1 },
    path,
    setPath,
    module,
    reloadModule: null,
  });
  handleCase(0, 0);
  expect(path).toStrictEqual([0, '0.value.cases.0', 'pageComponents', 0]);
  const { computed } = useMethods({
    navigation: null,
    params: { id: 1 },
    path,
    setPath,
    module,
    reloadModule: null,
  });
  const { components } = computed();
  expect(components).toStrictEqual([new Component('Text', 111)]);
});

it('should after completing the switch case page, jump to another module and end this content module', () => {
  const path = [0, '0.value.cases.0', 'pageComponents', 0];
  const navigation = {
    navigate: jest.fn(),
  };
  const _case = new Case(11, 'Level 1 Case 1', ['Redirect_End', 2], []).setPageComponents([
    [new Component('Text', 111)],
  ]);
  const { nextStep } = useMethods({
    navigation,
    params: { id: 1 },
    path,
    setPath: null,
    module: {
      pageComponents: [[new Component('Switch', 1, new SwitchValue(new TextValue(), [_case]))]],
    },
    reloadModule: null,
  });
  nextStep(path);
  expect(navigation.navigate).toBeCalledWith('Module', {
    id: 2,
  });
});

it('should after completing the switch case page, jump to another module and continue this content module', () => {
  const path = [0, '0.value.cases.0', 'pageComponents', 0];
  const navigation = {
    navigate: jest.fn(),
  };
  const _case = new Case(11, 'Level 1 Case 1', ['Redirect_Continue', 2], []).setPageComponents([
    [new Component('Text', 111)],
  ]);
  const { nextStep } = useMethods({
    navigation,
    params: { id: 1 },
    path,
    setPath: null,
    module: {
      pageComponents: [[new Component('Switch', 1, new SwitchValue(new TextValue(), [_case]))]],
    },
    reloadModule: null,
  });
  nextStep(path);
  expect(navigation.navigate).toBeCalledWith('Module', {
    id: 2,
    path: null,
    moduleStack: [1],
    pathStack: [path],
  });
});

it('should reload module when route params change', () => {
  const setPath = jest.fn();
  const reloadModule = jest.fn();
  const { handleChangeRouteParams } = useMethods({
    navigation: null,
    params: { id: 1 },
    path: null,
    setPath,
    module: null,
    reloadModule,
  });
  handleChangeRouteParams({ id: 2 });
  expect(reloadModule).toBeCalledWith(2);
  expect(setPath).toBeCalledWith([0]);
});

it('should continue on the previous path', () => {
  const setPath = jest.fn();
  const reloadModule = jest.fn();
  const { handleChangeRouteParams } = useMethods({
    navigation: null,
    params: { id: 1 },
    path: null,
    setPath,
    module: {
      pageComponents: [[1], [2], [3]],
    },
    reloadModule,
  });
  handleChangeRouteParams({ id: 2, path: [1] });
  expect(reloadModule).toBeCalledWith(2);
  expect(setPath).toBeCalledWith([2]);
});

it('should go back to the from module and continue on the previous path', () => {
  const navigation = {
    navigate: jest.fn(),
  };
  const { finish } = useMethods({
    navigation,
    params: { id: 2, moduleStack: [1], pathStack: [[1]] },
    path: null,
    setPath: null,
    module: null,
    reloadModule: null,
  });
  finish();
  expect(navigation.navigate).toBeCalledWith('Module', {
    id: 1,
    path: [1],
    moduleStack: [],
    pathStack: [],
  });
});
