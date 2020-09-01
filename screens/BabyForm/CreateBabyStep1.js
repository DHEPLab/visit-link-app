import React, { useEffect, useState } from 'react';

import { useBoolState } from '../../utils';
import { styled } from '../../utils/styled';
import { CreateBabyNavigator, BabyForm, Modal } from '../../components';

export default function CreateBabyStep1({ navigation }) {
  const [visible, open, close] = useBoolState();
  const [action, setAction] = useState();

  useEffect(
    () =>
      navigation.addListener('beforeRemove', (e) => {
        if (e.data.action.type !== 'GO_BACK') return;
        e.preventDefault();
        open();
        setAction(e.data.action);
      }),
    [navigation]
  );

  function onSubmit(values) {
    navigation.navigate('CreateBabyStep2', { baby: values });
  }

  return (
    <>
      <CreateBabyNavigator active={1} navigation={navigation} />
      <Container>
        <BabyForm onSubmit={onSubmit} submitBtnText="下一步" />
      </Container>
      <Modal
        visible={visible}
        title="提示"
        contentText="已编辑内容将丢失是否返回至宝宝列表"
        okText="退出"
        cancelText="再想想"
        onCancel={close}
        onOk={() => {
          close();
          navigation.dispatch(action);
        }}
      />
    </>
  );
}

const Container = styled.View`
  padding: 20px 28px;
`;
