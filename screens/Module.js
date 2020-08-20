import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Text from '../components/curriculum/Text';
import Media from '../components/curriculum/Media';
import storage from '../cache/storage';
import { styled } from '../utils/styled';
import { Colors } from '../constants';
import { Button } from '../components';

export function useMethods() {
  function onCase(_case, setCaseComponents, setFinishAction) {
    setCaseComponents(_case.components);
    setFinishAction(_case.finishAction);
  }

  function finish(navigation, params) {
    navigation.navigate('LessonModules', {
      id: params.lessonId,
      moduleId: params.id,
      finished: true,
    });
  }

  function nextStep(
    navigation,
    params,
    caseComponents,
    setCaseComponents,
    setFinishAction,
    theLastPage,
    setPage
  ) {
    if (caseComponents) {
      setCaseComponents();
      setFinishAction();
      // TODO Finish Action
    }
    if (theLastPage) {
      return finish(navigation, params);
    }
    setPage((page) => page + 1);
  }

  function lastStep(caseComponents, setCaseComponents, setFinishAction, setPage) {
    if (caseComponents) {
      setCaseComponents();
      setFinishAction();
    } else {
      setPage((page) => page - 1);
    }
  }

  return {
    onCase,
    theComponents: (caseComponents, module, page) =>
      caseComponents || (module.pageComponents && module.pageComponents[page]) || [],
    theLastComponent: (components) => components[components.length - 1] || {},
    theSwitchAtTheEnd: (lastComponent) => lastComponent.type === 'Switch',
    isTheLastPage: (page, module) => page === module.pageComponents?.length - 1,
    nextStep,
    lastStep,
  };
}

export default function Module({ navigation, route }) {
  const { params } = route;
  const [module] = storage.useModule(params.id);
  const [page, setPage] = useState(0);

  const [caseComponents, setCaseComponents] = useState();
  const [finishAction, setFinishAction] = useState();

  const {
    onCase,
    theComponents,
    theLastComponent,
    theSwitchAtTheEnd,
    isTheLastPage,
    nextStep,
  } = useMethods();

  const components = theComponents(caseComponents, module, page);
  const lastComponent = theLastComponent(components);
  const switchAtTheEnd = theSwitchAtTheEnd(lastComponent);
  const theLastPage = isTheLastPage(page, module);

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
                  onPress={() => onCase(_case, setCaseComponents, setFinishAction)}
                />
              ))}
            </>
          ) : (
            <Button
              size="large"
              title={theLastPage ? '完成' : '下一步'}
              onPress={() =>
                nextStep(
                  navigation,
                  params,
                  caseComponents,
                  setCaseComponents,
                  setFinishAction,
                  theLastPage,
                  setPage
                )
              }
            />
          )}
          {page > 0 && (
            <Button
              type="info"
              title="上一步"
              onPress={() => lastStep(caseComponents, setCaseComponents, setFinishAction, setPage)}
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
`;

const Header = styled(LinearGradient)`
  padding: 0 28px;
  padding-top: 10px;
  min-height: 84px;
  padding-bottom: 10px;
  width: 100%;
`;
