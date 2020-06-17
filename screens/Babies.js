import React from 'react';
import { FlatList, TextInput, RefreshControl } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

import { styled } from '../utils/styled';
import { Colors } from '../constants';
import { Button, BabyCard } from '../components';
import { useFetch } from '../utils';

export default function Babies() {
  const { navigate } = useNavigation();
  const [babies, refresh, refreshing] = useFetch('/api/baby', {}, []);

  return (
    <>
      <Header {...Colors.linearGradient}>
        <Search>
          <TextInput placeholder="请您输入要搜索的宝宝姓名" />
        </Search>
      </Header>
      <ListHeader>
        <Title>宝宝列表</Title>
        <Button title="添加宝宝" />
      </ListHeader>
      <FlatList
        refreshControl={
          <RefreshControl
            colors={Colors.colors}
            onRefresh={() => refresh()}
            refreshing={refreshing}
          />
        }
        data={babies}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => <BabyCard onPress={() => navigate('Baby')} {...item} />}
      />
    </>
  );
}

const ListHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 16px 28px;
`;

const Title = styled.Text`
  font-size: 12px;
  color: #525252;
  font-weight: bold;
`;

const Header = styled(LinearGradient)`
  width: 100%;
  height: 56px;
  padding-top: 22px;
  align-items: center;
`;

const Search = styled.View`
  width: 334px;
  height: 24px;
  background: rgba(0, 0, 0, 0.2);
  justify-content: center;
  border-radius: 12px;
  padding-left: 12px;
`;
