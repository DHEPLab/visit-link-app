import React from 'react';

import { styled } from '../utils/styled';
import { StaticField, StaticForm, LargeButtonContainer, Button } from '../components';

export default function PickVisitTime({ navigation }) {
  function handleSubmit() {
    const visitTime = new Date().getTime();
    navigation.navigate('CreateVisit', { visitTime });
  }

  return (
    <Container>
      <CardField>
        <StaticForm>
          <StaticField label="选择家访日期" labelWidth={60}>
            2020年05月22日
          </StaticField>
        </StaticForm>
      </CardField>
      <CardField>
        <StaticForm>
          <StaticField label="选择家访时间" labelWidth={60}>
            上午10:00
          </StaticField>
        </StaticForm>
      </CardField>

      <LargeButtonContainer>
        <Button size="large" title="提交" onPress={handleSubmit} />
      </LargeButtonContainer>
    </Container>
  );
}

const Container = styled.View`
  padding: 20px 28px;
`;

const CardField = styled.View`
  margin-bottom: 12px;
  background: #fff;
  border-radius: 8px;
  padding: 12px;
`;
