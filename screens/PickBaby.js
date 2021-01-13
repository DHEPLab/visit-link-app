import React from 'react';
import { FlatList, RefreshControl } from 'react-native';

import { Colors } from '../constants';
import { styled } from '../utils/styled';
import { BabyItem, NoData } from '../components';
import { useFetch } from '../utils';

export default function PickBaby({ navigation, route }) {
  const [babies, refresh, refreshing] = useFetch('/api/babies/available-for-visit', {
    visitDate: route.params.visitDate,
  }, []);

  function pick(baby) {
    navigation.navigate('CreateVisit', { baby });
  }

  return (
    <Container>
      <Hint>根据系统规则，部分宝宝在该时间无法安排家访，因此不可选。</Hint>
      <FlatList
        ListEmptyComponent={<NoData title="暂无可用宝宝" />}
        refreshControl={
          <RefreshControl
            colors={Colors.colors}
            onRefresh={() => refresh()}
            refreshing={refreshing}
          />
        }
        data={babies}
        keyExtractor={(item) => item.id + ''}
        renderItem={({ item }) => <BabyItem onPress={() => pick(item)} {...item} />}
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
