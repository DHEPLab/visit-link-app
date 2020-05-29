import React from 'react';
import { styled } from '../config/styled';
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
        <FormItem label="所在区域">
          <Input placeholder="请输入您的真实姓名" />
        </FormItem>
      </Form>
      <StyledButton size="large" title="提交" />
    </Container>
  );
}

const Container = styled.View`
  padding: 20px 28px;
`;

const StyledButton = styled(Button)`
  margin-top: 50px;
`;
