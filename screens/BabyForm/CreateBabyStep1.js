import React from 'react';
import { styled } from '../../utils/styled';

import { CreateBabyNavigator, BabyForm } from '../../components';

export default function CreateBabyStep1({ navigation }) {
  function onSubmit(values) {
    navigation.navigate('CreateBabyStep2', { baby: values });
  }

  return (
    <>
      <CreateBabyNavigator active={1} navigation={navigation} />
      <Container>
        <BabyForm onSubmit={onSubmit} submitBtnText="下一步" />
      </Container>
    </>
  );
}

const Container = styled.View`
  padding: 20px 28px;
`;
