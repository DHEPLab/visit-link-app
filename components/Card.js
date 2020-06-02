import React from 'react';
import { styled } from '../config/styled';

export default function ({ title, children }) {
  return (
    <Card>
      <Header>
        <Title>{title}</Title>
      </Header>
      <Body>{children}</Body>
    </Card>
  );
}

const Card = styled.View`
  width: 100%;
  background: #fff;
  border-radius: 8px;
  margin-bottom: 12px;
`;

const Header = styled.View`
  height: 40px;
  padding: 0 24px;
  align-items: center;
  flex-direction: row;
  border-bottom-width: 1px;
  border-color: #ffede2;
`;

const Title = styled.Text`
  color: #ff794f;
  font-size: 12px;
  font-weight: bold;
`;

const Body = styled.View`
  padding: 12px 24px;
`;
