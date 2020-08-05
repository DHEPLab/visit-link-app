import React from 'react';
import { Formik } from 'formik';
import { styled } from '../utils/styled';

import { Card, LargeButtonContainer, Button, Form, FormItem, Input } from '../components';

export default function CreateBaby() {
  function onSubmit() {}

  return (
    <Container>
      <Formik initialValues={{}} onSubmit={onSubmit}>
        {({ handleSubmit, values }) => (
          <>
            <Card title="宝宝信息" noPadding>
              <Form>
                <FormItem name="name" label="宝宝姓名">
                  <Input placeholder="请输入2-10个汉字" />
                </FormItem>
                <FormItem name="gender" label="宝宝性别">
                  <Input />
                </FormItem>
                <FormItem name="stage" label="成长阶段" noBorder>
                  <Input />
                </FormItem>
              </Form>
            </Card>
            <LargeButtonContainer>
              <Button size="large" title="下一步" />
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
