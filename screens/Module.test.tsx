import { useMethods } from './Module';
import storage from '../cache/storage';
import { SwitchValue, Component, TextValue, Case } from '../utils/module';

jest.mock('../cache/storage', () => ({
  getModule: jest.fn(),
}));

it('should gets the component of the current page', () => {
  const path = [0];
  const module = {
    pageComponents: [[1, 2]],
  };
  const { computed } = useMethods();
  const { components, lastComponent, theLastPage, switchAtTheEnd } = computed(module, path);
  expect(components).toStrictEqual([1, 2]);
  expect(lastComponent).toBe(2);
  expect(theLastPage).toBeTruthy();
  expect(switchAtTheEnd).toBeFalsy();
});

it('should turn to the next page', () => {
  let path = [0];
  const setPath = (_path: any) => (path = _path);
  const { nextStep } = useMethods();
  nextStep(
    null,
    { id: 1 },
    {
      pageComponents: [1, 2],
    },
    path,
    setPath
  );
  expect(path).toStrictEqual([1]);
});

it('should turn to the next page and current in case page components', () => {
  const navigate = jest.fn();
  const params = {
    id: 1,
    originId: 1,
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
  const { nextStep } = useMethods();
  nextStep(navigate, params, module, path, setPath);
  expect(path).toStrictEqual([0, '0.value.cases.0', 'pageComponents', 1]);
  nextStep(navigate, params, module, path, setPath);
  expect(path).toStrictEqual([1]);
  nextStep(navigate, params, module, path, setPath);
  expect(navigate).toBeCalledWith('LessonModules', {
    id: 2,
    originModuleId: 1,
    finished: true,
  });
});

it('should turn to the previous page', () => {
  let path = [1];
  const setPath = (_path: any) => (path = _path);
  let { previousStep } = useMethods();
  previousStep(path, setPath);
  expect(path).toStrictEqual([0]);
});

it('should turn to the previous page and current in case page components', () => {
  let path = [1, '0.value.cases.0', 'pageComponents', 1];
  const setPath = (_path: any) => (path = _path);
  let { previousStep } = useMethods();
  previousStep(path, setPath);
  expect(path).toStrictEqual([1, '0.value.cases.0', 'pageComponents', 0]);
  previousStep(path, setPath);
  expect(path).toStrictEqual([1]);
});

it('should change path on change case', () => {
  let path = [0];
  const setPath = (fn: Function) => (path = fn(path));
  const _case = new Case(11, 'Level 1 Case 1', ['Continue'], []).setPageComponents([
    [new Component('Text', 111)],
  ]);
  const module = {
    pageComponents: [[new Component('Switch', 1, new SwitchValue(new TextValue(), [_case]))]],
  };
  const { handleCase } = useMethods();
  handleCase(setPath, 0, 0);
  expect(path).toStrictEqual([0, '0.value.cases.0', 'pageComponents', 0]);
  const { computed } = useMethods();
  const { components } = computed(module, path);
  expect(components).toStrictEqual([new Component('Text', 111)]);
});

it('should after completing the switch case page, jump to another module and end this content module', () => {
  const path = [0, '0.value.cases.0', 'pageComponents', 0];
  const navigate = jest.fn();
  const _case = new Case(11, 'Level 1 Case 1', ['Redirect_End', 2], []).setPageComponents([
    [new Component('Text', 111)],
  ]);
  const module = {
    pageComponents: [[new Component('Switch', 1, new SwitchValue(new TextValue(), [_case]))]],
  };
  const params = { id: 1 };
  const { nextStep } = useMethods();
  nextStep(navigate, params, module, path, null);
  expect(navigate).toBeCalledWith('Module', {
    id: 2,
  });
});

it('should after completing the switch case page, jump to another module and continue this content module', () => {
  const path = [0, '0.value.cases.0', 'pageComponents', 0];
  const navigate = jest.fn();
  const _case = new Case(11, 'Level 1 Case 1', ['Redirect_Continue', 2], []).setPageComponents([
    [new Component('Text', 111)],
  ]);
  const module = {
    pageComponents: [[new Component('Switch', 1, new SwitchValue(new TextValue(), [_case]))]],
  };
  const params = { id: 1 };
  const { nextStep } = useMethods();
  nextStep(navigate, params, module, path, null);
  expect(navigate).toBeCalledWith('Module', {
    id: 2,
    path: null,
    moduleStack: [1],
    pathStack: [path],
  });
});

it('should reload module when route params change', () => {
  const setPath = jest.fn();
  const reloadModule = jest.fn();
  const params = { id: 2 };
  const { handleChangeRouteParams } = useMethods();
  handleChangeRouteParams(null, params, setPath, reloadModule, null);
  expect(reloadModule).toBeCalledWith(2);
  expect(setPath).toBeCalledWith([0]);
});

it('should continue on the previous path', async () => {
  const setPath = jest.fn();
  const setModule = jest.fn();
  const navigate = jest.fn();
  const { handleChangeRouteParams } = useMethods();
  const pageComponents = [
    [1],
    [
      {
        type: 'Switch',
        value: {
          cases: [
            {},
            {
              finishAction: ['Redirect_Continue', 45],
              pageComponents: [[121]],
            },
            {},
          ],
        },
      },
    ],
    [3],
  ];
  storage.getModule.mockResolvedValue({
    pageComponents,
  });
  await handleChangeRouteParams(
    navigate,
    { id: 44, path: [1, '0.value.cases.1', 'pageComponents', 0] },
    setPath,
    null,
    setModule
  );
  expect(navigate).not.toBeCalled();
  expect(setModule).toBeCalledWith({
    pageComponents,
  });
  expect(setPath).toBeCalledWith([2]);
});

it('should go back to the from module and continue on the previous path', () => {
  const navigate = jest.fn();
  const params = { id: 2, moduleStack: [1], pathStack: [[1]] };
  const { finish } = useMethods();
  finish(navigate, params);
  expect(navigate).toBeCalledWith('Module', {
    id: 1,
    path: [1],
    moduleStack: [],
    pathStack: [],
  });
});
