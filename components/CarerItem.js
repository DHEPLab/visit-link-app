import React from 'react';
import { styled } from '../utils/styled';
import StaticForm from './elements/StaticForm';
import StaticField from './elements/StaticField';

export default function CarerItem({ noBorder }) {
  return (
    <Container noBorder={noBorder}>
      <Header>
        <Number>看护人1</Number>
        <Master>主看护人</Master>
        <Operation>删除|修改</Operation>
      </Header>
      <StaticForm>
        <StaticField label="看护人姓名">张三</StaticField>
        <StaticField label="亲属关系">母亲</StaticField>
        <StaticField label="联系电话">1238123812983</StaticField>
        <StaticField label="微信号码">123123123124</StaticField>
      </StaticForm>
    </Container>
  );
}

const Container = styled.View`
  padding: 12px 0;
  border-bottom-width: 1px;
  border-color: #eee;
  ${({ noBorder }) =>
    noBorder &&
    `
    border-bottom-width: 0; 
  `}
`;

const Header = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
`;

const Number = styled.Text`
  color: #525252;
  font-size: 10px;
  font-weight: bold;
  width: 60px;
`;

const Master = styled.Text`
  color: #8e8e93;
  font-size: 10px;
`;

const Operation = styled.Text`
  flex: 1;
  text-align: right;
`;
