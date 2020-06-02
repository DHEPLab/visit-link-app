import React from 'react';
import { styled } from '../config/styled';
import { Form, FormItem, Input, Button } from '../components/*';

export default function () {
  return (
    <Container>
      <Form>
        <FormItem label="旧密码">
          <Input secureTextEntry />
        </FormItem>
        <FormItem label="新密码">
          <Input secureTextEntry />
        </FormItem>
        <FormItem label="确认密码" last>
          <Input secureTextEntry />
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
