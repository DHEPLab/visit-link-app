import React from 'react';

import http from '../../utils/http';
import { BabyForm } from '../../components';
import { styled } from '../../utils/styled';
import storage from '../../cache/storage';

export default function EditBaby({ navigation, route }) {
  const { params } = route;
  async function onSubmit(values) {
    if (!params.id) return;
    await http.put(`/api/babies/${params.id}`, values);
    clearNotSubmitVisit()
    navigation.navigate(params.from, {
      success: Math.random(),
    });
  }

  async function clearNotSubmitVisit(){
    const offlineVisits = await storage.getOfflineVisits() || []
    const delteteArray = offlineVisits.filter(n => n.id === params.id)
    storage.setOfflineVisits(delteteArray)
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
