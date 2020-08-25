import React, { useState, useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import lodash from 'lodash';

import Text from '../components/curriculum/Text';
import Media from '../components/curriculum/Media';
import storage from '../cache/storage';
import { Case } from '../utils/module';
import { styled } from '../utils/styled';
import { Colors } from '../constants';
import { Button } from '../components';

export function useMethods({ navigation, params, module, path, setPath }) {
  function onCase(switchComponentIndex: number, caseIndex: number) {
    setPath((path: any[]) =>
      // fold too many layers and expand when you use them
      path.concat([`${switchComponentIndex}.value.cases.${caseIndex}`, 'pageComponents', 0])
    );
  }

  function finish() {
    if (params.from && params.fromPath) {
      navigation.navigate('Module', {
        id: params.from,
        path: params.fromPath,
        from: null,
        fromPath: null,
      });
      return;
    }

    navigation.navigate('LessonModules', {
      id: params.lessonId,
      moduleId: params.id,
      finished: true,
    });
  }

  function totalPage(contextPath: any[]) {
    if (contextPath.length === 1) {
      return module.pageComponents.length;
    }
    return lodash.get(module?.pageComponents, unfoldPath(contextPath), []).length;
  }

  function getFinishAction(casesPath: any[]) {
    if (casesPath.length === 1) {
      return [];
    }
    return lodash.get(module?.pageComponents, unfoldPath([...casesPath, 'finishAction']));
  }

  function pageNumberPlusOne(path: any[]) {
    return path.map((item: number, index: number) => (index === path.length - 1 ? item + 1 : item));
  }

  function pageNumberMinusOne(path: any[]) {
    return path.map((item: number, index: number) => (index === path.length - 1 ? item - 1 : item));
  }

  function jumpToAnotherModule(finishAction: any[]) {
    const [action, target] = finishAction;
    if (action === 'Redirect_End') {
      navigation.navigate('Module', { id: target, from: params.id, fromPath: null });
      return;
    }

    if (action === 'Redirect_Continue') {
      navigation.navigate('Module', {
        id: target,
        from: params.id,
        fromPath: path,
      });
    }
  }

  function nextStep(path: any[]) {
    const _path = [...path];
    const contextPath = [..._path];
    const casesPath = [..._path];
    if (casesPath.length > 2) {
      casesPath.pop(); // pop ${casePageComponentsIndex} path
      casesPath.pop(); // pop 'pageComponents' path
      const finishAction = getFinishAction(casesPath);
      if (finishAction && finishAction.length == 2) {
        return jumpToAnotherModule(finishAction);
      }
    }

    if (contextPath.length > 1) {
      contextPath.pop();
    }

    if (totalPage(contextPath) > _path[_path.length - 1] + 1) {
      setPath(pageNumberPlusOne(_path));
    } else {
      // stop condition, complete module
      if (_path.length === 1) {
        return finish();
      }
      // go back level
      _path.pop(); // pop ${casePageComponentsIndex} path
      _path.pop(); // pop 'pageComponents' path
      _path.pop(); // pop ${switchComponentIndex}.value.cases.${caseIndex} path
      // recursive check
      nextStep(_path);
    }
  }

  function previousStep(path: any[]) {
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

  function canPreviousStep(path: any[]) {
    if (path[path.length - 1] > 0) {
      return true;
    } else {
      return path.length !== 1;
    }
  }

  // unfold layers for support lodash get method
  function unfoldPath(path: any[]) {
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

  function computed() {
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

  return {
    onCase,
    nextStep,
    previousStep,
    computed,
    finish,
  };
}

export default function Module({ navigation, route }) {
  const { params } = route;
  // the path of the page components to get current page
  const [path, setPath] = useState([0]);
  const [module, reloadModule] = storage.useModule(params.id);

  const { onCase, computed, previousStep, nextStep } = useMethods({
    navigation,
    params,
    module,
    path,
    setPath,
  });
  const { components, lastComponent, switchAtTheEnd, theLastPage, canPreviousStep } = computed();

  useEffect(() => {
    // when jump to another module
    if (route.params.id) {
      reloadModule(route.params.id);
      setPath([0]);
    }
    // when go back from another module and continue on the previous path
    if (route.params.path) {
      nextStep(route.params.path);
    }
  }, [route.params]);

  return (
    <>
      <Header {...Colors.linearGradient}>
        <Escape>
          <Button type="text" title="退出模块" onPress={navigation.goBack} />
        </Escape>
        <Name>{module.name}</Name>
        <Description>{module.description}</Description>
      </Header>

      <StyledScrollView>
        <ModuleCard>
          {components.map((component) => (
            <ModuleComponent key={component.key} component={component} />
          ))}
          {switchAtTheEnd && <Text value={lastComponent?.value?.question} />}
        </ModuleCard>

        <ButtonContainer>
          {switchAtTheEnd ? (
            <>
              {lastComponent?.value?.cases?.map((_case: Case, index: number) => (
                <Button
                  key={_case.key}
                  size="large"
                  title={_case.text}
                  onPress={() => onCase(components.length - 1, index)}
                />
              ))}
            </>
          ) : (
            <Button
              size="large"
              title={theLastPage ? '完成' : '下一步'}
              onPress={() => nextStep(path)}
            />
          )}
          {canPreviousStep && (
            <Button type="info" title="上一步" onPress={() => previousStep(path)} />
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
