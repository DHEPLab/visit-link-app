import React from 'react';
import { BabyForm } from '../../components';
import { styled } from '../../utils/styled';

export default function EditBaby({ navigation, route }) {
  const { params } = route;
  function onSubmit(values) {}

  return (
    <Container>
      <BabyForm onSubmit={onSubmit} initialValues={params.baby} />
    </Container>
  );
}

const Container = styled.View`
  padding: 20px 28px;
`;
