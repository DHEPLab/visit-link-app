import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';

import Http from '../utils/http';
import { styled } from '../utils/styled';
import { Form, FormItem, Input, Button, Alert } from '../components';
import { signOut } from '../actions';

const validationSchema = Yup.object().shape({
  oldPassword: Yup.string().required('旧密码不能为空'),
  password: Yup.string().min(6, '密码必须至少 6 个字符').required('不能为空'),
});

export default function ChangePassword() {
  const dispatch = useDispatch();

  function onSubmit({ password }) {
    Http.put('/api/account/password', {
      password,
    }).then(async () => {
      await Http.signOut();
      dispatch(signOut());
    });
  }

  return (
    <Container>
      <Alert>请您牢记修改的账户密码，提交后将不再显示。</Alert>
      <Formik initialValues={{}} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ handleSubmit, values }) => (
          <>
            <Form>
              <FormItem name="oldPassword" label="旧密码">
                <Input secureTextEntry />
              </FormItem>
              <FormItem name="password" label="新密码">
                <Input secureTextEntry />
              </FormItem>
              <FormItem
                name="confirmPassword"
                label="确认密码"
                noBorder
                validate={(value) => {
                  if (value !== values.password) {
                    return '您两次输入的新密码不一致';
                  }
                }}
              >
                <Input secureTextEntry />
              </FormItem>
            </Form>
            {/* <Alert>密码必须至少8个字符，而且同时包含字母和数字。</Alert> */}
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
  padding: 6px 28px;
`;

const ButtonContainer = styled.View`
  margin-top: 26px;
`;
