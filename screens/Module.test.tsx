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
  });
  const { components, lastComponent, theLastPage, switchAtTheEnd } = computed();
  expect(components).toStrictEqual([1, 2]);
  expect(lastComponent).toBe(2);
  expect(theLastPage).toBeTruthy();
  expect(switchAtTheEnd).toBeFalsy();
});

it('should turn to the next page', () => {
  let path = [0];
  const setPath = (fn) => (path = fn(path));
  const { nextStep } = useMethods({
    navigation: null,
    params: { id: 1 },
    path,
    setPath,
    module: null,
  });
  nextStep();
  expect(path).toStrictEqual([1]);
});

// it('should turn to the next page and current in case page components', () => {
//   let path = [0, 0, 'value', 'cases', 0, 'pageComponents', 0];
//   const setPath = (fn) => (path = fn(path));
//   const { nextStep } = useMethods({
//     navigation: null,
//     params: { id: 1 },
//     path,
//     setPath,
//     module: null,
//   });
//   nextStep();
//   expect(path).toStrictEqual([1]);
// });

it('should turn to the previous page', () => {
  let path = [1];
  const setPath = (fn) => (path = fn(path));
  const { lastStep } = useMethods({
    navigation: null,
    params: { id: 1 },
    path,
    setPath,
    module: null,
  });
  lastStep();
  expect(path).toStrictEqual([0]);
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
  const { onCase } = useMethods({
    navigation: null,
    params: { id: 1 },
    path,
    setPath,
    module,
  });
  onCase(0, 0, _case);
  expect(path).toStrictEqual([0, '0.value.cases.0.pageComponents', 0]);
  const { computed } = useMethods({
    navigation: null,
    params: { id: 1 },
    path,
    setPath,
    module,
  });
  const { components } = computed();
  expect(components).toStrictEqual([new Component('Text', 111)]);
});

// it('should after completing the switch case, continue at the level', () => {
//   const setCaseComponents = jest.fn();
//   const { onCase } = useMethods({
//     navigation: null,
//     params: { id: 1 },
//     page: 1,
//     module: null,
//     setPage: null,
//     caseComponents: null,
//     setCaseComponents,
//   });
//   onCase({
//     components: [1],
//   });
//   expect(setCaseComponents).toBeCalledWith([1]);
// });

// it('should after completing the switch case, jump to another module and end this content module', () => {
//   const navigation = {
//     navigate: jest.fn(),
//   };
//   const { onCase } = useMethods({
//     navigation,
//     params: { id: 1 },
//     page: 1,
//     module: null,
//     setPage: null,
//     caseComponents: null,
//     setCaseComponents: null,
//   });
//   onCase({
//     finishAction: ['Redirect_End', 2],
//   });
//   expect(navigation.navigate).toBeCalledWith('Module', { id: 2, from: 1 });
// });

// it('should after completing the switch case, jump to another module and continue this content module', () => {
//   const navigation = {
//     navigate: jest.fn(),
//   };
//   const { onCase } = useMethods({
//     navigation,
//     params: { id: 1 },
//     page: 1,
//     module: null,
//     setPage: null,
//     caseComponents: null,
//     setCaseComponents: null,
//   });
//   onCase({
//     finishAction: ['Redirect_Continue', 2],
//   });
//   expect(navigation.navigate).toBeCalledWith('Module', {
//     id: 2,
//     from: 1,
//     fromPage: 2,
//     finishAction: 'Redirect_Continue',
//   });
// });
