import React, { useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';

import { Colors } from '../constants';
import { styled } from '../utils/styled';
import { BabyCard } from '../components';

export default function PickBaby({ navigation }) {
  const [babies] = useState([
    {
      id: 8,
      name: 'sdasd',
      identity: '123123123',
      gender: 'UNKNOWN',
      stage: 'EDC',
      carerName: null,
      carerPhone: null,
      month: 10,
    },
    {
      id: 7,
      name: 'baby3',
      identity: 'baby3',
      gender: 'FEMALE',
      stage: 'BIRTH',
      carerName: 'eeeee333',
      carerPhone: '15738839999',
      month: 2,
    },
  ]);

  function pick(baby) {
    navigation.navigate('CreateVisit', { baby });
  }

  return (
    <Container>
      <Hint>根据系统规则，部分宝宝在该时间无法安排家访，因此不可选。</Hint>
      <FlatList
        refreshControl={<RefreshControl colors={Colors.colors} />}
        data={babies}
        keyExtractor={(item) => item.id + ''}
        renderItem={({ item }) => <BabyCard onPress={() => pick(item)} {...item} />}
      />
    </Container>
  );
}

const Container = styled.View`
  margin: 20px 28px;
`;

const Hint = styled.Text`
  color: #8e8e93;
  font-size: 10px;
  margin-bottom: 24px;
`;
