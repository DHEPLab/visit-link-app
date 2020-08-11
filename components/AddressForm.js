import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';

import Form from './elements/Form';
import Card from './elements/Card';
import FormItem from './elements/FormItem';
import Input from './elements/Input';
import Button from './elements/Button';
import LargeButtonContainer from './LargeButtonContainer';

import { styled } from '../utils/styled';

const validationSchema = Yup.object().shape({
  area: Yup.string().required('此项为必填'),
  location: Yup.string().max(200, '最多200个字符').required('此项为必填'),
});

export default function AddressForm({ onSubmit, initialValues = {} }) {
  return (
    <Container>
      <Formik
        initialValues={initialValues}
        validateOnChange={false}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ handleSubmit }) => (
          <>
            <Card title="地址信息" noPadding>
              <Form>
                <FormItem name="area" label="所在区域">
                  <Input />
                </FormItem>
                <FormItem name="location" label="详细地址" noBorder>
                  <Input placeholder="请输入详细地址，精确到门牌号" />
                </FormItem>
              </Form>
            </Card>
            <LargeButtonContainer>
              <Button size="large" title="提交" onPress={handleSubmit} />
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
