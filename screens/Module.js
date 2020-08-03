import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Text from '../components/curriculum/Text';
import Media from '../components/curriculum/Media';
import storage from '../cache/storage';
import ModuleUtils from '../utils/module';
import { styled } from '../utils/styled';
import { Colors } from '../constants';
import { Button } from '../components';

export default function Module({ navigation, route }) {
  const { params } = route;
  const [module] = storage.useModule(params.id);
  const [page, setPage] = useState(0);
  const [pageComponents, setPageComponents] = useState([[]]);

  const [caseComponents, setCaseComponents] = useState();
  const [finishAction, setFinishAction] = useState();

  const components = caseComponents || pageComponents[page] || [];
  const lastComponent = components[components.length - 1] || {};
  const switchAtTheEnd = lastComponent.type === 'Switch';

  useEffect(() => {
    if (module.components) {
      setPageComponents(ModuleUtils.pageable(module.components));
    }
  }, [module]);

  function nextStep() {
    if (caseComponents) {
      setCaseComponents();
      setFinishAction();
      // TODO Finish Action
    }
    if (page === pageComponents.length - 1) {
      return finish();
    }
    setPage(page + 1);
  }

  function finish() {
    navigation.navigate('LessonModules', { id: params.id, finish: true });
  }

  function lastStep() {
    if (caseComponents) {
      setCaseComponents();
      setFinishAction();
    } else {
      setPage(page - 1);
    }
  }

  function onCase(_case) {
    setCaseComponents(_case.components);
    setFinishAction(_case.finishAction);
  }

  return (
    <>
      <Header {...Colors.linearGradient}>
        <Escape>
          <Button text title="退出模块" onPress={navigation.goBack} />
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
            <Button size="large" title="下一步" onPress={nextStep} />
          )}
          {page > 0 && <Button info title="上一步" onPress={lastStep} />}
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
