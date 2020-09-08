import React from 'react';

import http from '../../utils/http';
import { BabyForm } from '../../components';
import { styled } from '../../utils/styled';

export default function EditBaby({ navigation, route }) {
  const { params } = route;
  async function onSubmit(values) {
    if (!params.id) return;
    await http.put(`/api/babies/${params.id}`, values);
    navigation.navigate(params.from, {
      success: Math.random(),
    });
  }

  return (
    <Container>
      <BabyForm onSubmit={onSubmit} initialValues={params.baby} />
    </Container>
  );
}

const Container = styled.View`
  padding: 20px 28px;
`;
