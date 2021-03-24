import React from 'react';
import { CommonActions } from '@react-navigation/native';

import { CreateBabyNavigator, AddressForm, Message } from '../../components';
import NetInfo from '@react-native-community/netinfo';

import http from '../../utils/http';
import { useBoolState } from '../../utils';
import storage from '../../cache/storage';

export default function CreateBabyStep3({ navigation, route }) {
  const { params } = route;
  const { baby, carers } = params;
  const [visible, openMessage, closeMessage] = useBoolState();
  const [submitting, startSubmit, endSubmit] = useBoolState();

  async function onSubmit(values) {
    startSubmit();
    const net = await NetInfo.fetch();
    if (!net.isConnected) { // 离线
      const baby = { ...baby, ...values }
      storage.setOfflineBabies([...storage.getOfflineBabies(), baby])
      openMessage();
      setTimeout(() => {
        closeMessage();
        navigation.dispatch((state) => {
          // clear all routing records except the home screen
          const [home] = state.routes;
          return CommonActions.reset({
            index: 0,
            routes: [home]
          });
        });
        navigation.navigate('Baby', { ...baby, tab: 'family' });
      }, 1000);
    } else {
      http
        .post('/api/babies', {
          baby: {
            ...baby,
            ...values,
          },
          carers,
        })
        .then((data) => {
          openMessage();
          setTimeout(() => {
            closeMessage();
            navigation.dispatch((state) => {
              // clear all routing records except the home screen
              const [home] = state.routes;
              return CommonActions.reset({
                index: 0,
                routes: [home],
              });
            });
            navigation.navigate('Baby', { ...data, tab: 'family' });
          }, 1000);
        })
        .finally(() => {
          endSubmit();
        });
    }
  }

  return (
    <>
      <CreateBabyNavigator active={3} navigation={navigation} />
      <AddressForm onSubmit={onSubmit} submitting={submitting} />
      <Message
        visible={visible}
        title="提交成功"
        content="稍后可在列表中查看结果，新建宝宝需要督导员审核，如需尽快审核，请直接联系您的督导员。"
      />
    </>
  );
}
