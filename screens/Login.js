import React from 'react';
import { styled } from '../config/styled';
import { Form, FormItem, PrimaryInput, Button } from '../components/*';
import { Formik } from 'formik';

export default function () {
  return (
    <Login>
      <Logo
        resizeMode="contain"
        source={require('../assets/images/logo.png')}
      />
      <Formik
        initialValues={{ username: '' }}
        onSubmit={(values) => console.log(values)}
      >
        {({ handleSubmit }) => (
          <Form>
            <FormItem name="username" center noBorder>
              <PrimaryInput placeholder="请输入账户名称" />
            </FormItem>
            <FormItem name="password" center noBorder>
              <PrimaryInput secureTextEntry placeholder="请输入账户密码" />
            </FormItem>
            <ForgetPassword>
              <Button text title="忘记密码" />
            </ForgetPassword>
            <Button size="large" title="登录" onPress={handleSubmit} />
          </Form>
        )}
      </Formik>
      {/* <Inset
        resizeMode="contain"
        source={require('../assets/images/login-inset.png')}
      /> */}
    </Login>
  );
}

const Logo = styled.Image`
  width: 136px;
  align-self: center;
`;

const Inset = styled.Image`
  position: absolute;
  height: 280px;
  width: 400px;
  left: 0;
  bottom: 0;
`;

const Login = styled.View`
  position: relative;
  background: #fff;
  width: 100%;
  height: 100%;
  padding-top: 100px;
`;

const ForgetPassword = styled.View`
  width: 260px;
  margin: 0px auto 10px auto;
  align-items: flex-end;
`;
