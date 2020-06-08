import React from 'react';
import { styled } from '../utils/styled';
import { Form, FormItem, Input, Button } from '../components/*';

export default function () {
  return (
    <Container>
      <Form>
        <FormItem label="真实姓名">
          <Input placeholder="请输入您的真实姓名" />
        </FormItem>
        <FormItem label="联系电话">
          <Input placeholder="请输入 11 位手机号码" />
        </FormItem>
        <FormItem label="所在区域" last>
          <Input placeholder="请选择省份、城市、区域" />
        </FormItem>
      </Form>
      <ButtonContainer>
        <Button size="large" title="提交" />
      </ButtonContainer>
    </Container>
  );
}

const Container = styled.View`
  padding: 20px 28px;
`;

const ButtonContainer = styled.View`
  margin-top: 50px;
`;
