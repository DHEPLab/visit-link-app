import React from 'react';
import { Formik } from 'formik';
import { styled } from '../../utils/styled';

import {
  Radios,
  Card,
  LargeButtonContainer,
  Button,
  Form,
  FormItem,
  Input,
} from '../../components';
import { FamilyTies } from '../../constants/enums';

export default function CreateCarer({ navigation }) {
  function onSubmit() {}

  return (
    <Container>
      <Formik initialValues={{}} onSubmit={onSubmit}>
        {({ handleSubmit, values }) => (
          <>
            <Card title="看护人1" noPadding>
              <Form>
                <FormItem name="name" label="真实姓名">
                  <Input placeholder="请输入2-10个汉字" />
                </FormItem>
                <FormItem name="gender" label="亲属关系">
                  <Radios enums={FamilyTies} />
                </FormItem>
                <FormItem name="stage" label="联系电话">
                  <Input placeholder="请输入11位手机号码" />
                </FormItem>
                <FormItem name="edc" label="微信号码" noBorder>
                  <Input placeholder="请输入微信号" />
                </FormItem>
              </Form>
            </Card>
            <LargeButtonContainer>
              <Button
                size="large"
                title="添加"
                onPress={() => navigation.navigate('CreateBabyStep2')}
              />
            </LargeButtonContainer>
          </>
        )}
      </Formik>
    </Container>
  );
}

const Container = styled.View`
  padding: 20px 28px;
`;
