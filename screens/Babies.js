import React, { useState, useEffect } from 'react';
import { FlatList, TextInput, RefreshControl } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

import http from '../utils/http';
import { styled, px2dp } from '../utils/styled';
import { Colors } from '../constants';
import { BabyItem, NoData, Button } from '../components';
import { useBoolState } from '../utils';

export default function Babies({ navigation }) {
  const { navigate } = navigation;
  const [search, setSearch] = useState({
    page: 0,
    size: 10,
  });
  const [totalPages, setTotalPages] = useState(0);
  const [contents, setContents] = useState([]);
  const [refreshing, startRefresh, endRefresh] = useBoolState();
  const [name, setName] = useState();

  useEffect(() => {
    startRefresh();
    if (search.page === 0) setContents([]);
    http
      .get('/api/babies', search)
      .then((data) => {
        setTotalPages(data.totalPages);
        setContents((c) => [...c, ...data.content]);
      })
      .finally(() => endRefresh());
  }, [search]);

  function refresh() {
    setSearch((s) => ({
      ...s,
      page: 0,
      name: name || '',
    }));
  }

  return (
    <>
      <Header {...Colors.linearGradient}>
        <Search>
          <MaterialIcons name="search" size={px2dp(16)} color="#fff" />
          <TextInput
            style={{ marginLeft: px2dp(4), flex: 1, color: '#fff' }}
            onChangeText={(text) => setName(text)}
            onEndEditing={() => refresh()}
            placeholder="请您输入要搜索的宝宝姓名"
          />
        </Search>
      </Header>
      {contents.length > 0 && (
        <ListHeader>
          <Title>宝宝列表</Title>
          <Button onPress={() => navigate('CreateBabyStep1')} title="添加宝宝" />
        </ListHeader>
      )}
      <FlatList
        ListEmptyComponent={
          <NoDataContainer>
            <NoData title="暂无匹配的宝宝信息" />
          </NoDataContainer>
        }
        refreshControl={
          <RefreshControl
            colors={Colors.colors}
            onRefresh={() => refresh()}
            refreshing={refreshing}
          />
        }
        data={contents}
        keyExtractor={(item) => item.id + ''}
        onEndReached={() => console.log('on end reached')}
        renderItem={({ item }) => <BabyItem onPress={(baby) => navigate('Baby', baby)} {...item} />}
      />
    </>
  );
}

const NoDataContainer = styled.View`
  height: 350px;
  justify-content: center;
`;

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
  flex-direction: row;
  width: 334px;
  height: 24px;
  background: rgba(0, 0, 0, 0.2);
  align-items: center;
  border-radius: 12px;
  padding-left: 12px;
`;
