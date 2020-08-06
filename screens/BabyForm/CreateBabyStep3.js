import React from 'react';
import { Formik } from 'formik';
import { styled } from '../../utils/styled';

import {
  Cascader,
  CreateBabyNavigator,
  Card,
  LargeButtonContainer,
  Button,
  Form,
  FormItem,
  Input,
} from '../../components';

export default function CreateBabyStep3({ navigation }) {
  function onSubmit() {}

  return (
    <>
      <CreateBabyNavigator active={3} navigation={navigation} />
      <Container>
        <Formik initialValues={{}} onSubmit={onSubmit}>
          {({ handleSubmit, values }) => (
            <>
              <Card title="地址信息" noPadding>
                <Form>
                  <FormItem name="name" label="所在区域">
                    <Input />
                  </FormItem>
                  <FormItem name="gender" label="详细地址" noBorder>
                    <Input placeholder="请输入详细地址，精确到门牌号" />
                  </FormItem>
                </Form>
              </Card>
              <LargeButtonContainer>
                <Button size="large" title="提交" onPress={() => navigation.navigate('Babies')} />
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
