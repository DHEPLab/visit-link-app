import React from 'react';
import { styled } from '../utils/styled';
import { FamilyTies } from '../constants/enums';

import StaticForm from './elements/StaticForm';
import StaticField from './elements/StaticField';
import Button from './elements/Button';

export default function CarerItem({ number, value, noBorder }) {
  return (
    <Container noBorder={noBorder}>
      <Header>
        <Number>看护人{number}</Number>
        <Master>主看护人</Master>
        <Operation>
          <Button title="删除" />
          <Button title="修改" />
        </Operation>
      </Header>
      <StaticForm>
        <StaticField label="看护人姓名">{value.name}</StaticField>
        <StaticField label="亲属关系">{FamilyTies[value.familyTies]}</StaticField>
        <StaticField label="联系电话">{value.phone}</StaticField>
        <StaticField label="微信号码">{value.wechat}</StaticField>
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

const Operation = styled.View`
  flex: 1;
  text-align: right;
`;
