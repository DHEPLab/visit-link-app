import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';

import StaticForm from './StaticForm';
import StaticField from './StaticField';
import Status from './Status';
import { formatVisitTime } from '../utils';
import { Colors } from '../constants';
import { styled, px2dp } from '../utils/styled';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function VisitCard({ onPress, value }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <Container>
        <Status
          title={'待开始'}
          borderColor={Colors.visitStatusBorder[value.status]}
          color={Colors.visitStatus[value.status]}
        />
        <FormContainer>
          <StaticForm>
            {value.babyName && <StaticField label="课堂名称">{value.babyName}</StaticField>}
            <StaticField label="课堂名称">{value.name}</StaticField>
            <StaticField label="家访时间">{formatVisitTime(value.date)}</StaticField>
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
