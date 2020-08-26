import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';

import StaticForm from './elements/StaticForm';
import StaticField from './elements/StaticField';
import Status from './Status';
import Visit from '../utils/visit';
import { Colors } from '../constants';
import { VisitStatus } from '../constants/enums';
import { styled, px2dp } from '../utils/styled';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function VisitItem({ onPress, value, redDot }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <Container>
        <Status
          title={VisitStatus[value.status]}
          borderColor={Colors.visitStatusBorder[value.status]}
          color={Colors.visitStatus[value.status]}
        />
        <FormContainer>
          <StaticForm>
            {value.babyName && <StaticField label="宝宝名称">{value.babyName}</StaticField>}
            <StaticField label="课堂名称">{value.lessonName}</StaticField>
            <StaticField label="家访时间">{Visit.formatDateTimeCN(value.visitTime)}</StaticField>
          </StaticForm>
        </FormContainer>
        {redDot && <RedDot />}
        <MaterialIcons name="keyboard-arrow-right" size={px2dp(14)} color="#FF794F" />
      </Container>
    </TouchableOpacity>
  );
}

const RedDot = styled.View`
  width: 4px;
  height: 4px;
  border-radius: 4px;
  margin-right: 4px;
  background: rgba(221, 0, 0, 1);
`;

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
