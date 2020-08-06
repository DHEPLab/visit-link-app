import React from 'react';
import * as Yup from 'yup';
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

const validationSchema = Yup.object().shape({
  name: Yup.string().min(2, '最少2个字符').max(10, '最多10个字符').required('此项为必填'),
  familyTies: Yup.string().required('此项为必填'),
  phone: Yup.string().required('此项为必填'),
  wechat: Yup.string().max(20, '最多20个字符'),
});

export default function CreateCarer({ navigation, route }) {
  const { params } = route;
  function onSubmit(carer) {
    const carerIndex = params?.carerIndex == null ? -1 : params?.carerIndex;
    navigation.navigate('CreateBabyStep2', { carer, carerIndex });
  }

  return (
    <Container>
      <Formik
        initialValues={params?.carer || {}}
        validateOnChange={false}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ handleSubmit }) => (
          <>
            <Card title="看护人" noPadding>
              <Form>
                <FormItem name="name" label="真实姓名">
                  <Input placeholder="请输入2-10个汉字" />
                </FormItem>
                <FormItem name="familyTies" label="亲属关系">
                  <Radios enums={FamilyTies} />
                </FormItem>
                <FormItem name="phone" label="联系电话">
                  <Input placeholder="请输入11位手机号码" />
                </FormItem>
                <FormItem name="wechat" label="微信号码" noBorder>
                  <Input placeholder="请输入微信号" />
                </FormItem>
              </Form>
            </Card>
            <LargeButtonContainer>
              <Button size="large" title={params?.carer ? '提交' : '添加'} onPress={handleSubmit} />
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
