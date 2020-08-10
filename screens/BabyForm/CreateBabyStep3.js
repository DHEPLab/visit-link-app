import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';

import {
  CreateBabyNavigator,
  Card,
  LargeButtonContainer,
  Button,
  Form,
  FormItem,
  Input,
} from '../../components';
import { CommonActions } from '@react-navigation/native';

import http from '../../utils/http';
import { styled } from '../../utils/styled';

const validationSchema = Yup.object().shape({
  area: Yup.string().required('此项为必填'),
  location: Yup.string().max(200, '最多200个字符').required('此项为必填'),
});

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
      <Container>
        <Formik
          initialValues={{}}
          validateOnChange={false}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ handleSubmit }) => (
            <>
              <Card title="地址信息" noPadding>
                <Form>
                  <FormItem name="area" label="所在区域">
                    <Input />
                  </FormItem>
                  <FormItem name="location" label="详细地址" noBorder>
                    <Input placeholder="请输入详细地址，精确到门牌号" />
                  </FormItem>
                </Form>
              </Card>
              <LargeButtonContainer>
                <Button size="large" title="提交" onPress={handleSubmit} />
              </LargeButtonContainer>
            </>
          )}
        </Formik>
      </Container>
    </>
  );
}

const Container = styled.View`
  padding: 20px 28px;
`;
