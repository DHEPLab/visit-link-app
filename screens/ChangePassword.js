import React from 'react';
import { styled } from '../config/styled';
import { Form, FormItem, Input, Button } from '../components/*';
import { Formik } from 'formik';

export default function () {
  function onSubmit(values) {
    console.log(values);
  }

  return (
    <Container>
      <Formik initialValues={{}} onSubmit={onSubmit}>
        {({ handleSubmit }) => (
          <>
            <Form>
              <FormItem name="oldPassword" label="旧密码">
                <Input secureTextEntry />
              </FormItem>
              <FormItem name="password" label="新密码">
                <Input secureTextEntry />
              </FormItem>
              <FormItem name="confirmPassword" label="确认密码" noBorder>
                <Input secureTextEntry />
              </FormItem>
            </Form>
            <ButtonContainer>
              <Button size="large" onPress={handleSubmit} title="提交" />
            </ButtonContainer>
          </>
        )}
      </Formik>
    </Container>
  );
}

const Container = styled.View`
  padding: 20px 28px;
`;

const ButtonContainer = styled.View`
  margin-top: 50px;
`;
