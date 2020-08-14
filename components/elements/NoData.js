import React from 'react';
import { Image } from 'react-native';

import { styled } from '../../utils/styled';

export default function NoData({ title }) {
  return (
    <Container>
      <StyledImage source={require('../../assets/images/no-data.png')} />
      <Title>{title}</Title>
    </Container>
  );
}

const Container = styled.View`
  padding: 20px 0;
  align-items: center;
`;

const Title = styled.Text`
  color: #8e8e93;
  font-size: 10px;
`;

const StyledImage = styled(Image)`
  height: 115px;
  width: 160px;
  margin-bottom: 16px;
`;
