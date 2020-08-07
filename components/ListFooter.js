import React from 'react';
import { ActivityIndicator } from 'react-native';
import { styled } from '../utils/styled';
import { Colors } from '../constants';

export default function ListFooter({ loading }) {
  return (
    <Container>
      {loading ? <ActivityIndicator color={Colors.primary} /> : <NoMore>无更多数据</NoMore>}
    </Container>
  );
}

const Container = styled.View`
  margin-bottom: 10px;
`;

const NoMore = styled.Text`
  align-self: center;
  color: #8e8e93;
  font-size: 8px;
`;
