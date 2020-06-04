import React from 'react';
import { styled } from '../config/styled';
import { Form, FormItem, Input, Button } from '../components/*';
import { Formik, Field } from 'formik';

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
            <Field name="username">
              {({
                field: { name, value },
                form: { handleChange, handleBlur },
              }) => (
                <FormItem center border={false}>
                  <Input
                    value={value}
                    onChangeText={handleChange(name)}
                    onBlur={handleBlur(name)}
                    login
                    placeholder="请输入账户名称"
                  />
                </FormItem>
              )}
            </Field>
            <Field name="password">
              {({
                field: { name, value },
                form: { handleChange, handleBlur },
              }) => (
                <FormItem center border={false}>
                  <Input
                    secureTextEntry
                    value={value}
                    onChangeText={handleChange(name)}
                    onBlur={handleBlur(name)}
                    login
                    placeholder="请输入账户密码"
                  />
                </FormItem>
              )}
            </Field>
            <FormItem center border={false}>
              <ForgetPassword>
                <Button text title="忘记密码" />
              </ForgetPassword>
            </FormItem>
            <FormItem center border={false}>
              <Button size="large" title="登录" onPress={handleSubmit} />
            </FormItem>
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
  align-items: flex-end;
`;
