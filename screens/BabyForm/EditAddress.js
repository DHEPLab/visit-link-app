import React from 'react';

import http from '../../utils/http';
import { AddressForm } from '../../components';

export default function EditAddress({ navigation, route }) {
  const { params } = route;

  async function onSubmit(values) {
    if (!params.id) return;
    await http.put(`/api/babies/${params.id}/address`, values);
    navigation.navigate(params.from, {
      success: Math.random(),
    });
  }

  return <AddressForm initialValues={params.address} onSubmit={onSubmit} />;
}
