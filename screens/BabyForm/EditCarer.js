import React from 'react';
import { ToastAndroid } from 'react-native';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { styled } from '../../utils/styled';

import {
  SolidRadios,
  Card,
  LargeButtonContainer,
  Button,
  Form,
  FormItem,
  Input,
  CheckBox,
} from '../../components';
import { FamilyTies } from '../../constants/enums';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[\u4e00-\u9fa5]{2,10}$/, '请输入2个以上的汉字，最多10个字符')
    .required('此项为必填'),
  familyTies: Yup.string().required('此项为必填'),
  phone: Yup.string()
    .matches(/^1[0-9]{10}$/, '请输入正确的手机号')
    .required('此项为必填'),
  wechat: Yup.string().nullable(true).max(20, '最多20个字符'),
});

// The same baby cannot choose caregivers who have the same family ties
function filteredFamilyTies(familyTies) {
  if (!familyTies) return FamilyTies;
  const filtered = {};
  Object.keys(FamilyTies)
    .filter((key) => !familyTies.includes(key))
    .forEach((key) => {
      filtered[key] = FamilyTies[key];
    });
  return filtered;
}

export default function CreateCarer({ navigation, route }) {
  const { params } = route;
  function onSubmit(carer) {
    if (params?.carer?.master && !carer.master) {
      ToastAndroid.show('请至少设置一个主看护人', ToastAndroid.LONG);
      return;
    }

    const carerIndex = params?.carerIndex == null ? -1 : params?.carerIndex;
    navigation.navigate(params.from, { carer, carerIndex });
  }

  return (
    <Container>
      <Formik
        initialValues={params?.carer || { master: false }}
        validateOnChange={false}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ handleSubmit, values, setFieldValue }) => (
          <>
            <Card
              title="看护人"
              right={
                <CheckBox
                  label="主看护人"
                  value={values.master}
                  onChange={(checked) => setFieldValue('master', checked)}
                />
              }
              noPadding
            >
              <Form>
                <FormItem name="name" label="真实姓名">
                  <Input placeholder="请输入2-10个汉字" />
                </FormItem>
                <FormItem name="familyTies" label="亲属关系">
                  <SolidRadios enums={filteredFamilyTies(params.filterFamilyTies)} />
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
