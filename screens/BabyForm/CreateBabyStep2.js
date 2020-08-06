import React from 'react';
import { View } from 'react-native';

import { styled } from '../../utils/styled';
import {
  CreateBabyNavigator,
  Card,
  LargeButtonContainer,
  Button,
  Form,
  FormItem,
  Input,
} from '../../components';

export default function CreateBabyStep2({ navigation }) {
  return (
    <>
      <CreateBabyNavigator active={2} navigation={navigation} />
      <Container>
        <ListHeader>
          <View>
            <Title>看护人列表</Title>
            <SubTitle>最多可添加4位看护人</SubTitle>
          </View>
          <Button title="添加看护人" onPress={() => navigation.navigate('CreateCarer')} />
        </ListHeader>
        <LargeButtonContainer>
          <Button
            size="large"
            title="下一步"
            onPress={() => navigation.navigate('CreateBabyStep3')}
          />
        </LargeButtonContainer>
      </Container>
    </>
  );
}

const Container = styled.View`
  padding: 20px 28px;
`;

const ListHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const Title = styled.Text`
  color: #525252;
  font-size: 12px;
  font-weight: bold;
`;

const SubTitle = styled.Text`
  color: #8e8e93;
  font-size: 10px;
  margin-top: 10px;
`;
