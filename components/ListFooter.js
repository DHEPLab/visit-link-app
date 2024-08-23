import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useTranslation } from 'react-i18next';
import { styled } from '../utils/styled';
import { Colors } from '../constants';

export default function ListFooter({ loading }) {
  const { t } = useTranslation('ListFooter');

  return (
      <Container>
        {loading ? <ActivityIndicator color={Colors.primary} /> : <NoMore>{t('noMoreData')}</NoMore>}
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