import React from 'react';
import { ScrollView, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Text from '../components/curriculum/Text';
import Media from '../components/curriculum/Media';
import storage from '../cache/storage';
import { styled } from '../utils/styled';
import { Colors } from '../constants';
import { Button } from '../components';

export default function Module({ navigation, route }) {
  const [module] = storage.useModule(route.params.id);

  function switchAtTheEnd(components) {
    return last(components).type === 'Switch';
  }

  function last(components) {
    if (!components) return {};
    return components[components.length - 1] || {};
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
          {module.components?.map((component) => (
            <ModuleComponent key={component.key} component={component} />
          ))}
          {switchAtTheEnd(module.components) && (
            <Text value={last(module.components).value.question} />
          )}
        </ModuleCard>
        <ButtonContainer>
          {switchAtTheEnd(module.components) ? (
            <>
              {last(module.components).value.cases.map((_case) => (
                <Button key={_case.key} size="large" title={_case.text} />
              ))}
            </>
          ) : (
            <Button size="large" title="下一步" />
          )}
          <Button info title="上一步" />
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
