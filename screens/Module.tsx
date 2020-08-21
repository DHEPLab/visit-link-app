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
  function onCase(switchComponentIndex: number, caseIndex: number, _case: Case) {
    setPath((path) =>
      // fold too many layers and expand when you use them
      path.concat([`${switchComponentIndex}.value.cases.${caseIndex}.pageComponents`, 0])
    );
    // if (!_case.finishAction || _case.finishAction.length != 2) {
    //   setCaseComponents(_case.components);
    //   return;
    // }
    // const [action, target] = _case.finishAction;
    // if (action === 'Redirect_End') {
    //   navigation.navigate('Module', { id: target, from: params.id });
    // }
    // if (action === 'Redirect_Continue') {
    //   navigation.navigate('Module', {
    //     id: target,
    //     from: params.id,
    //     fromPage: page + 1,
    //     finishAction: 'Redirect_Continue',
    //   });
    // }
  }

  function finish() {
    navigation.navigate('LessonModules', {
      id: params.lessonId,
      moduleId: params.id,
      finished: true,
    });
  }

  function nextStep() {
    setPath((path) => path.map((item) => item + 1));
  }

  function lastStep() {
    setPath((path) => {
      path[0] -= 1;
      return path;
    });
  }

  // unfold layers for support lodash get method
  function unfoldPath(path) {
    const array = [];
    path.forEach((p) => {
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
    return { components, lastComponent, switchAtTheEnd, theLastPage };
  }

  return {
    onCase,
    nextStep,
    lastStep,
    computed,
  };
}

export default function Module({ navigation, route }) {
  const { params } = route;
  // the path of the page components to get current page
  const [path, setPath] = useState([0]);
  const [module, reloadModule] = storage.useModule(params.id);

  useEffect(() => {
    if (route.params.id) {
      reloadModule(route.params.id);
    }
  }, [route.params]);

  const { onCase, computed, lastStep, nextStep } = useMethods({
    navigation,
    params,
    module,
    path,
    setPath,
  });
  const { components, lastComponent, switchAtTheEnd, theLastPage } = computed();

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
                  onPress={() => onCase(components.length - 1, index, _case)}
                />
              ))}
            </>
          ) : (
            <Button
              size="large"
              title={theLastPage ? '完成' : '下一步'}
              onPress={() => nextStep()}
            />
          )}
          {path[0] > 0 && <Button type="info" title="上一步" onPress={() => lastStep()} />}
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
`;

const Header = styled(LinearGradient)`
  padding: 0 28px;
  padding-top: 10px;
  min-height: 84px;
  padding-bottom: 10px;
  width: 100%;
`;
