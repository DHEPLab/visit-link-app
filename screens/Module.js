import React, { useState, useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Text from '../components/curriculum/Text';
import Media from '../components/curriculum/Media';
import storage from '../cache/storage';
import { styled } from '../utils/styled';
import { Colors } from '../constants';
import { Button } from '../components';

export function useMethods({
  navigation,
  params,
  module,
  page,
  setPage,
  caseComponents,
  setCaseComponents,
}) {
  function onCase(_case) {
    if (!_case.finishAction || _case.finishAction.length != 2) {
      setCaseComponents(_case.components);
      return;
    }

    const [action, target] = _case.finishAction;
    if (action === 'Redirect_End') {
      navigation.navigate('Module', { id: target, from: params.id });
    }
    if (action === 'Redirect_Continue') {
      navigation.navigate('Module', {
        id: target,
        from: params.id,
        fromPage: page + 1,
        finishAction: 'Redirect_Continue',
      });
    }
  }

  function finish() {
    navigation.navigate('LessonModules', {
      id: params.lessonId,
      moduleId: params.id,
      finished: true,
    });
  }

  function nextStep(theLastPage) {
    if (caseComponents) {
      setCaseComponents();
    }

    if (theLastPage) {
      return finish();
    }
    setPage((page) => page + 1);
  }

  function lastStep() {
    if (caseComponents) {
      setCaseComponents();
    } else {
      setPage((page) => page - 1);
    }
  }

  function computed() {
    const components =
      caseComponents || (module.pageComponents && module.pageComponents[page]) || [];
    const lastComponent = components[components.length - 1] || {};
    const switchAtTheEnd = lastComponent.type === 'Switch';
    const theLastPage = page === module.pageComponents?.length - 1;
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
  const [page, setPage] = useState(0);
  const [caseComponents, setCaseComponents] = useState();
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
    page,
    setPage,
    caseComponents,
    setCaseComponents,
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
              {lastComponent?.value?.cases?.map((_case) => (
                <Button
                  key={_case.key}
                  size="large"
                  title={_case.text}
                  onPress={() => onCase(_case)}
                />
              ))}
            </>
          ) : (
            <Button
              size="large"
              title={theLastPage ? '完成' : '下一步'}
              onPress={() => nextStep(theLastPage)}
            />
          )}
          {page > 0 && <Button type="info" title="上一步" onPress={() => lastStep()} />}
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
