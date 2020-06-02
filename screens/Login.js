import React from 'react';
import { styled } from '../config/styled';
import { Form, FormItem, Input, Button } from '../components/*';

export default function () {
  return (
    <Login>
      <Logo
        resizeMode="contain"
        source={require('../assets/images/logo.png')}
      />
      <Form>
        <FormItem center border={false}>
          <Input login placeholder="请输入账户名称" />
        </FormItem>
        <FormItem center border={false}>
          <Input secureTextEntry login placeholder="请输入账户密码" />
        </FormItem>
        <FormItem center border={false}>
          <ForgetPassword>
            <Button text title="忘记密码" />
          </ForgetPassword>
        </FormItem>
        <FormItem center border={false}>
          <Button size="large" title="登录" />
        </FormItem>
      </Form>
      <Inset
        resizeMode="contain"
        source={require('../assets/images/login-inset.png')}
      />
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
  align-items: flex-end;
`;
