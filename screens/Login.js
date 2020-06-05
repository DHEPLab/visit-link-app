import React, { useState, useContext } from 'react';
import { Dimensions } from 'react-native';
import { styled } from '../config/styled';
import { FormItem, PrimaryInput, Button } from '../components/*';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Http from '../utils/http';
import { signIn } from '../actions';
import { useDispatch } from 'react-redux';

const screenHeight = Math.round(Dimensions.get('window').height);

export default function () {
  const [badCredentials, setBadCredentials] = useState(false);
  const dispatch = useDispatch();

  function onSubmit(values) {
    setBadCredentials(false);

    Http.post('/api/authenticate', values)
      .then((response) => {
        Http.auth(response.idToken);
        dispatch(signIn(response));
      })
      .catch((_) => {
        setBadCredentials(true);
      });
  }

  return (
    <Login>
      <Logo
        resizeMode="contain"
        source={require('../assets/images/logo.png')}
      />
      <Formik
        initialValues={{ username: '' }}
        validationSchema={Yup.object().shape({
          username: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
          password: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        })}
        onSubmit={onSubmit}
      >
        {({ handleSubmit }) => (
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
            {badCredentials && (
              <BadCredentials>您输入的账号名称/账号密码可能有误</BadCredentials>
            )}
            <Button size="large" title="登录" onPress={handleSubmit} />
          </FormContainer>
        )}
      </Formik>
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
  bottom: 0;
  z-index: -1;
`;

const Login = styled.View`
  position: relative;
  background: #fff;
  width: 100%;
  height: ${screenHeight}PX;
  padding-top: 100px;
`;

const ForgetPassword = styled.View`
  width: 260px;
  margin: 0px auto 10px auto;
  align-items: flex-end;
`;
