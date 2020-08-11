import React from 'react';

import { AddressForm } from '../../components';

export default function EditAddress({ navigation, route }) {
  const { params } = route;

  function onSubmit(values) {
    navigation.navigate(params.from, {
      address: values,
    });
  }

  return <AddressForm initialValues={params.address} onSubmit={onSubmit} />;
}
