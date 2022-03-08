import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import lodash from 'lodash';

import Text from '../components/curriculum/Text';
import storage from '../cache/storage';
import {Case} from '../utils/module';
import {styled} from '../utils/styled';
import {Colors} from '../constants';
import {Button} from '../components';
import Media from "../components/curriculum/Media";


export function useMethods(preview) {
  function handleCase(setPath: Function, switchComponentIndex: number, caseIndex: number) {
    setPath((path: any[]) =>
      // fold too many layers and expand when you use them
      path.concat([`${switchComponentIndex}.value.cases.${caseIndex}`, 'pageComponents', 0])
    );
  }

  function finish(navigate: Function, params: any) {
    // if there are elements in the module statck, push out
    if (params?.moduleStack?.length > 0 && params?.pathStack?.length > 0) {
      const moduleStack = [...params.moduleStack];
      const pathStack = [...params.pathStack];
      const id = moduleStack.shift();
      const path = pathStack.shift();
      // go back to the module screen at the top of the stack
      navigate('Module', {
        id,
        path,
        moduleStack,
        pathStack,
        originId: params.originId
      });
      return;
    }
    if (preview) {
      return
    }
    // go back to the lesson modules page and finished current module
    navigate('LessonModules', {
      id: params.lessonId,
      originModuleId: params.originId,
      finished: true,
    });
  }

  function jumpToAnotherModule(
    navigate: Function,
    params: any,
    path: Array<string | number>,
    finishAction: Array<string | number>
  ) {
    const [action, target] = finishAction;
    if (action === 'Redirect_End') {
      navigate('Module', { id: target });
      return;
    }

    if (action === 'Redirect_Continue') {
      // deep copy module, path stack
      const moduleStack = (params.moduleStack && [...params.moduleStack]) || [];
      const pathStack = (params.pathStack && [...params.pathStack]) || [];
      // into the stack
      moduleStack.unshift(params.id);
      pathStack.unshift(path);

      navigate('Module', {
        id: target,
        path: null,
        moduleStack,
        pathStack,
        originId: params.originId
      });
    }
  }

  function nextStep(
    navigate: Function,
    params: any,
    module: any,
    path: Array<any>,
    setPath: Function,
    skipFinishAction: boolean = false
  ) {
    const _path = [...path];
    const contextPath = [..._path];
    const casesPath = [..._path];
    if (!skipFinishAction && casesPath.length > 2) {
      casesPath.pop(); // pop ${casePageComponentsIndex} path
      casesPath.pop(); // pop 'pageComponents' path
      const finishAction = getFinishAction(module, casesPath);
      if (finishAction && finishAction.length == 2) {
        return jumpToAnotherModule(navigate, params, path, finishAction);
      }
    }

    if (contextPath.length > 1) {
      contextPath.pop();
    }

    if (totalPage(module, contextPath) > _path[_path.length - 1] + 1) {
      setPath(pageNumberPlusOne(_path));
    } else {
      // stop condition, complete module
      if (_path.length === 1) {
        return finish(navigate, params);
      }
      // go back level
      _path.pop(); // pop ${casePageComponentsIndex} path
      _path.pop(); // pop 'pageComponents' path
      _path.pop(); // pop ${switchComponentIndex}.value.cases.${caseIndex} path
      // recursive check
      nextStep(navigate, params, module, _path, setPath, true);
    }
  }

  function previousStep(path: Array<any>, setPath: Function) {
    if (path[path.length - 1] > 0) {
      setPath(pageNumberMinusOne(path));
    } else {
      // stop condition, do nothing
      if (path.length === 1) {
        return;
      }
      // go back level
      const _path = [...path];
      _path.pop(); // pop ${casePageComponentsIndex} path
      _path.pop(); // pop 'pageComponents' path
      _path.pop(); // pop ${switchComponentIndex}.value.cases.${caseIndex} path
      setPath(_path);
    }
  }

  function totalPage(module: any, contextPath: Array<string | number>) {
    if (contextPath.length === 1) {
      return module.pageComponents.length;
    }
    return lodash.get(module?.pageComponents, unfoldPath(contextPath), []).length;
  }

  function getFinishAction(module: any, casesPath: Array<string | number>) {
    if (casesPath.length === 1) {
      return [];
    }
    return lodash.get(module?.pageComponents, unfoldPath([...casesPath, 'finishAction']));
  }

  function pageNumberPlusOne(path: Array<string | number>) {
    return path.map((item: number, index: number) => (index === path.length - 1 ? item + 1 : item));
  }

  function pageNumberMinusOne(path: Array<string | number>) {
    return path.map((item: number, index: number) => (index === path.length - 1 ? item - 1 : item));
  }

  function canPreviousStep(path: any[]) {
    if (path[path.length - 1] > 0) {
      return true;
    } else {
      return path.length !== 1;
    }
  }

  // unfold layers for support lodash get method
  // 0.value.cases.0 -> [0, 'value', 'cases', 0]
  function unfoldPath(path: Array<string | number>) {
    const array = [];
    path.forEach((p: string | number) => {
      if (typeof p === 'string') {
        array.push(...p.split('.'));
      } else {
        array.push(p);
      }
    });
    return array;
  }

  function computed(module: any, path: Array<string | number>) {
    const components = lodash.get(module?.pageComponents, unfoldPath(path), []);
    const lastComponent = components[components.length - 1] || {};
    const switchAtTheEnd = lastComponent.type === 'Switch';
    const theLastPage = path[0] === module.pageComponents?.length - 1;
    return {
      components,
      lastComponent,
      switchAtTheEnd,
      theLastPage,
      canPreviousStep: canPreviousStep(path),
    };
  }

  function handleChangeRouteParams(
    navigate: Function,
    params: any,
    setPath: Function,
    reloadModule: Function,
    setModule: Function
  ) {
    if (!params?.id) return;
    // when go back from another module and continue on the previous path
    if (params.path) {
      return storage.getModule(params.id).then((module: any) => {
        setModule(module);
        nextStep(navigate, params, module, params.path, setPath, true);
      });
    } else {
      reloadModule(params.id);
      setPath([0]);
    }
  }

  return {
    handleCase,
    nextStep,
    previousStep,
    computed,
    finish,
    handleChangeRouteParams,
  };
}

export default function ModuleScreen({ navigation, route }) {
  const { params } = route;
  // the path of the page components to get current page
  const [path, setPath] = useState([0]);
  const [module, reloadModule, setModule] = storage.useModule(params.id);

  const { handleCase, computed, previousStep, nextStep, handleChangeRouteParams } = useMethods(params.preview);
  const { components, lastComponent, switchAtTheEnd, theLastPage, canPreviousStep } = computed(
    module,
    path
  );

  useEffect(() => {
    handleChangeRouteParams(navigation.navigate, route.params, setPath, reloadModule, setModule);
  }, [route.params]);
  return (
    <>
      <Header {...Colors.linearGradient}>
        <Escape>
          <Button
            disabled={false}
            type="text"
            title="退出模块"
            onPress={navigation.goBack}
          />
        </Escape>
        <Name>{module.name}</Name>
        <Description>{module.description}</Description>
      </Header>

      <StyledScrollView>
        <ModuleCard>
          {components.map((component: any) => (
              <ModuleComponent key={component.key} component={component} />
          ))}
          {switchAtTheEnd && <Text value={lastComponent?.value?.question} />}
        </ModuleCard>

        <ButtonContainer>
          {switchAtTheEnd ? (
            <>
              {lastComponent?.value?.cases?.map(
                (_case: Case, index: number) => (
                  <Button
                    key={_case.key}
                    size="large"
                    title={_case.text}
                    onPress={() =>
                      handleCase(setPath, components.length - 1, index)
                    }
                    disabled={false}
                  />
                )
              )}
            </>
          ) : (
            <Button
              size="large"
              title={theLastPage ? '完成' : '下一步'}
              onPress={() =>
                nextStep(navigation.navigate, params, module, path, setPath)
              }
              disabled={false}
            />
          )}
          {canPreviousStep && (
            <Button
              type="info"
              title="上一步"
              onPress={() => previousStep(path, setPath)}
              disabled={false}
            />
          )}
        </ButtonContainer>
      </StyledScrollView>
    </>
  );
}

function ModuleComponent({ component }) {
  let As;
  switch (component.type) {
    case 'Text':
      As = Text;
      break;
    case 'Media':
      As = Media;
      break;
    default:
      // ignore Switch, PageFooter component, manual render Switch
      As = View;
  }
  return <As value={component.value} />;
}

const Escape = styled.View`
  position: absolute;
  right: 28px;
  top: 20px;
  z-index: 10;
`;

const ButtonContainer = styled.View`
  margin-top: 20px;
  margin-bottom: 40px;
`;

const StyledScrollView = styled(ScrollView)`
  padding: 20px 28px;
`;

const ModuleCard = styled.View`
  padding: 20px 24px;
  padding-bottom: 5px;
  border-radius: 8px;
  background: #fff;
`;

const Description = styled.Text`
  font-size: 10px;
  color: #fff;
  margin-top: 6px;
`;

const Name = styled(Description)`
  font-weight: bold;
  margin-top: 12px;
  width: 280px;
`;

const Header = styled(LinearGradient)`
  padding: 0 28px;
  padding-top: 10px;
  min-height: 84px;
  padding-bottom: 10px;
  width: 100%;
`;
