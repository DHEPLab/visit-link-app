import React from 'react';
import { CommonActions } from '@react-navigation/native';

import { CreateBabyNavigator, AddressForm } from '../../components';

import http from '../../utils/http';

export default function CreateBabyStep3({ navigation, route }) {
  const { params } = route;
  const { baby, carers } = params;

  function onSubmit(values) {
    http
      .post('/api/babies', {
        baby: {
          ...baby,
          ...values,
        },
        carers,
      })
      .then((data) => {
        navigation.dispatch((state) => {
          // clear all routing records except the home screen
          const [home] = state.routes;
          return CommonActions.reset({
            index: 0,
            routes: [home],
          });
        });
        navigation.navigate('Baby', { ...data, tab: 'family' });
      });
  }

  return (
    <>
      <CreateBabyNavigator active={3} navigation={navigation} />
      <AddressForm onSubmit={onSubmit} />
    </>
  );
}
