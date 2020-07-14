import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';

import { StaticForm, StaticField } from './';
import { styled, px2dp } from '../utils/styled';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function VisitCard({ onPress, value }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <Container>
        <Status></Status>
        <FormContainer>
          <StaticForm>
            <StaticField label="课堂名称">课堂名称课堂名称课堂名称课堂名称</StaticField>
            <StaticField label="家访时间">2020年05月22日 /上午10:00</StaticField>
          </StaticForm>
        </FormContainer>
        <MaterialIcons name="keyboard-arrow-right" size={px2dp(14)} color="#FF794F" />
      </Container>
    </TouchableOpacity>
  );
}

const Container = styled.View`
  background: #fff;
  border-radius: 8px;
  margin-bottom: 10px;
  flex-direction: row;
  padding: 14px;
  align-items: center;
`;

const FormContainer = styled.View`
  flex: 1;
  padding-right: 30px;
`;

const Status = styled.View``;
