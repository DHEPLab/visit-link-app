import React from 'react';
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
  Radios,
} from '../../components';
import { Gender, BabyStage, FeedingPattern, AssistedFood } from '../../constants/enums';

export default function CreateBabyStep1({ navigation }) {
  function onSubmit() {}

  return (
    <>
      <CreateBabyNavigator active={1} navigation={navigation} />
      <Container>
        <Formik initialValues={{}} onSubmit={onSubmit}>
          {({ handleSubmit, values }) => (
            <>
              <Card title="宝宝信息" noPadding>
                <Form>
                  <FormItem name="name" label="宝宝姓名">
                    <Input placeholder="请输入2-10个汉字" />
                  </FormItem>
                  <FormItem name="gender" label="宝宝性别">
                    <Radios enums={Gender} />
                  </FormItem>
                  <FormItem name="stage" label="成长阶段">
                    <Radios enums={BabyStage} />
                  </FormItem>
                  <FormItem name="edc" label="预产日期">
                    <Input />
                  </FormItem>
                  <FormItem name="birthday" label="出生日期">
                    <Input />
                  </FormItem>
                  <FormItem name="assistedFood" label="添加辅食">
                    <Radios enums={AssistedFood} />
                  </FormItem>
                  <FormItem name="feedingPattern" label="喂养状态" noBorder>
                    <Radios enums={FeedingPattern} />
                  </FormItem>
                </Form>
              </Card>
              <LargeButtonContainer>
                <Button
                  size="large"
                  title="下一步"
                  onPress={() => navigation.navigate('CreateBabyStep2')}
                />
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
