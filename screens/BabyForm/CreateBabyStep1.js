import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { styled } from '../../utils/styled';

import {
  CreateBabyNavigator,
  Card,
  LargeButtonContainer,
  Button,
  Form,
  FormItem,
  Input,
  SolidRadios,
  DatePicker,
} from '../../components';
import { Gender, BabyStage, FeedingPattern, AssistedFood } from '../../constants/enums';

const validationSchema = Yup.object().shape({
  name: Yup.string().min(2, '最少2个字符').max(10, '最多10个字符').required('此项为必填'),
  gender: Yup.string().required('此项为必填'),
  stage: Yup.string().required('此项为必填'),
});

export default function CreateBabyStep1({ navigation }) {
  function onSubmit(values) {
    navigation.navigate('CreateBabyStep2', { baby: values });
  }

  function validate(values) {
    const errors = {};
    switch (values.stage) {
      case 'EDC':
        if (!values.edc) errors.edc = '此项为必填';
        break;
      case 'BIRTH':
        if (!values.birthday) errors.birthday = '此项为必填';
        if (!values.assistedFood) errors.assistedFood = '此项为必填';
        if (!values.feedingPattern) errors.feedingPattern = '此项为必填';
        break;
    }
    return errors;
  }

  return (
    <>
      <CreateBabyNavigator active={1} navigation={navigation} />
      <Container>
        <Formik
          initialValues={{}}
          validate={validate}
          validateOnChange={false}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ handleSubmit, values }) => (
            <>
              <Card title="宝宝信息" noPadding>
                <Form>
                  <FormItem name="name" label="宝宝姓名">
                    <Input placeholder="请输入2-10个汉字" />
                  </FormItem>
                  <FormItem name="gender" label="宝宝性别">
                    <SolidRadios enums={Gender} />
                  </FormItem>
                  <FormItem name="stage" label="成长阶段" noBorder={!values.stage}>
                    <SolidRadios enums={BabyStage} />
                  </FormItem>
                  {values.stage === 'EDC' && (
                    <FormItem name="edc" label="预产日期" noBorder>
                      <DatePicker />
                    </FormItem>
                  )}
                  {values.stage === 'BIRTH' && (
                    <>
                      <FormItem name="birthday" label="出生日期">
                        <DatePicker />
                      </FormItem>
                      <FormItem name="assistedFood" label="添加辅食">
                        <SolidRadios enums={AssistedFood} />
                      </FormItem>
                      <FormItem name="feedingPattern" label="喂养状态" noBorder>
                        <SolidRadios enums={FeedingPattern} />
                      </FormItem>
                    </>
                  )}
                </Form>
              </Card>
              <LargeButtonContainer>
                <Button size="large" title="下一步" onPress={handleSubmit} />
              </LargeButtonContainer>
            </>
          )}
        </Formik>
      </Container>
    </>
  );
}

const Container = styled.View`
  padding: 20px 28px;
`;
