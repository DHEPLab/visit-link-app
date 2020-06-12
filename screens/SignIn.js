import React from 'react';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';

import Http from '../utils/http';
import { useBoolState } from '../utils';
import { Layout } from '../constants/*';
import { styled } from '../utils/styled';
import { FormItem, PrimaryInput, Button } from '../components/*';
import { signIn } from '../actions';

export default function SignIn() {
  const dispatch = useDispatch();
  const [badCredentials, onBadCredentials, resetBadCredentials] = useBoolState();

  function onSubmit(values) {
    resetBadCredentials();
    Http.post('/api/authenticate', values)
      .then((data) => {
        Http.auth(data.idToken);
        dispatch(signIn(data));
      })
      .catch(onBadCredentials);
  }

  return (
    <Container>
      <Logo resizeMode="contain" source={require('../assets/images/logo.png')} />
      <Formik initialValues={{}} onSubmit={onSubmit}>
        {({ handleSubmit, values }) => (
          <FormContainer>
            <FormItem name="username" center noBorder>
              <PrimaryInput placeholder="请输入账户名称" />
            </FormItem>
            <FormItem name="password" center noBorder>
              <PrimaryInput secureTextEntry placeholder="请输入账户密码" />
            </FormItem>
            <ForgetPassword>
              <Button text title="忘记密码" />
            </ForgetPassword>
            {badCredentials && <BadCredentials>您输入的账号名称/账号密码可能有误</BadCredentials>}
            <Button
              disabled={!values.username || !values.password}
              size="large"
              title="登录"
              onPress={handleSubmit}
            />
          </FormContainer>
        )}
      </Formik>
      <Inset resizeMode="contain" source={require('../assets/images/login-inset.png')} />
    </Container>
  );
}

const Logo = styled.Image`
  width: 136px;
  align-self: center;
`;

const FormContainer = styled.View`
  width: 260px;
  margin: 0 auto;
`;

const BadCredentials = styled.Text`
  color: #ff2e2e;
  font-size: 10px;
  font-weight: bold;
  margin-bottom: 16px;
  margin-top: -10px;
`;

const Inset = styled.Image`
  position: absolute;
  height: 280px;
  width: 400px;
  left: 0;
  bottom: -5px;
  z-index: -1;
`;

const Container = styled.View`
  position: relative;
  background: #fff;
  width: 100%;
  height: ${Layout.window.height}px;
  padding-top: 100px;
`;

const ForgetPassword = styled.View`
  width: 260px;
  margin: 0px auto 10px auto;
  align-items: flex-end;
`;
