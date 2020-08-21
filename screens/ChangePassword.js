import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';

import Http from '../utils/http';
import { styled } from '../utils/styled';
import { Form, FormItem, PasswordInput, Button, Alert, LargeButtonContainer } from '../components';
import { signOut } from '../actions';
import { ToastAndroid, Keyboard } from 'react-native';

const validationSchema = Yup.object().shape({
  oldPassword: Yup.string().required('旧密码不能为空'),
  password: Yup.string().min(6, '密码必须至少 6 个字符').required('不能为空'),
});

export default function ChangePassword() {
  const dispatch = useDispatch();

  function onSubmit({ oldPassword, password }) {
    // fix huawei unable to display toast when soft keyborard pops up
    Keyboard.dismiss();
    Http.put('/api/account/password', {
      oldPassword,
      password,
    })
      .then(async () => {
        await Http.signOut();
        dispatch(signOut());
      })
      .catch((_) => {
        ToastAndroid.showWithGravity('旧密码错误', ToastAndroid.LONG, ToastAndroid.TOP);
      });
  }

  return (
    <Container>
      <Alert>请您牢记修改的账户密码，提交后将不再显示。</Alert>
      <Formik
        initialValues={{}}
        validateOnChange={false}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ handleSubmit, values }) => (
          <>
            <Form labelWidth={50} labelAlign="right">
              <FormItem name="oldPassword" label="旧密码">
                <PasswordInput />
              </FormItem>
              <FormItem name="password" label="新密码">
                <PasswordInput />
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
                <PasswordInput onEndEditing={handleSubmit} />
              </FormItem>
            </Form>
            <LargeButtonContainer>
              <Button size="large" onPress={handleSubmit} title="提交" />
            </LargeButtonContainer>
          </>
        )}
      </Formik>
    </Container>
  );
}

const Container = styled.View`
  padding: 6px 28px;
`;
