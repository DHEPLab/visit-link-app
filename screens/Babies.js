import React, { useState, useEffect } from 'react';
import { FlatList, TextInput, RefreshControl } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import storage from '../cache/storage';
import { uploadOfflineBabies, uploadOfflineVisits } from '../cache/uploadData'

import http from '../utils/http';
import { styled, px2dp } from '../utils/styled';
import { Colors } from '../constants';
import { BabyItem, NoData, Button, ListFooter, Message, Modal } from '../components';
import { useBoolState } from '../utils';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Babies({ navigation }) {
  const { navigate } = navigation;
  const [search, setSearch] = useState({
    page: 0,
    size: 10,
  });
  const [totalPages, setTotalPages] = useState(0);
  const [contents, setContents] = useState([]);
  const [refreshing, startRefresh, endRefresh] = useBoolState();
  const [tooltip, openTooltip, closeTooltip] = useBoolState();
  const [loading, startLoad, endLoad] = useBoolState();
  const [messageVisble, openMessage, closeMessage] = useBoolState();
  const [connect, isConnect, isNotConnect] = useBoolState();
  const [name, setName] = useState();
  const { isConnected } = useSelector((state) => state.net);

  useEffect(() => navigation.addListener('focus', () => refresh()), [navigation]);

  useEffect(() => {
    // fix repeat load when first load
    if (search.name == null) return;
    if (!connect) return;
    if (search.page === 0) {
      startRefresh();
      setContents([]);
    } else {
      startLoad();
    }

    http
      .get('/api/babies', search)
      .then((data) => {
        setTotalPages(data.totalPages);
        setContents((c) => [...c, ...data.content]);
      })
      .finally(() => {
        endRefresh();
        endLoad();
      });
  }, [search]);

  function backupBabyAndCaregivers () {
    http
      .get('/api/babies', { page: 0, size: 1000 })
      .then((data) => {
        (data?.content || []).forEach(element => {
          if (element?.nextShouldVisitDTO?.lesson) {
            storage.addNextShouldVisit(element.id, element.nextShouldVisitDTO)
          }
        })
        storage.setBabies(data.content)
      })
      .finally(() => {
        openMessage();
      });
  }

  async function refresh() {
    if (refreshing) return;

    if (!isConnected) {
      isNotConnect()
      const data = await storage.getBabies()
      const offlineBabies = await storage.getOfflineBabies()
      setTotalPages(((data || []).length) + (offlineBabies || []).length);
      setContents([...(offlineBabies || []), ...(data || [])]);
    } else {
      isConnect()
      uploadOfflineBabies()
      uploadOfflineVisits()
    }

    setSearch((s) => ({
      ...s,
      page: 0,
      name: name || '',
    }));
  }

  function handleLoadMore() {
    if (refreshing || loading) return;
    if (totalPages === search.page + 1) return;
    setSearch((s) => ({
      ...s,
      page: s.page + 1,
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

      <Message
        visible={messageVisble}
        buttonText="知道了"
        onButtonPress={closeMessage}
        title="备份成功"
        content=" "
      />

      {contents.length > 0 && (
        <ListHeader>
          <TitleContainer>
            {connect?
              <TouchableOpacity activeOpacity={0.8} onPress={backupBabyAndCaregivers}>
                <TooltipContainer>
                  <PromptWords>请及时备份宝宝数据到本地，以便离线时正常使用, <Link>点此一键备份</Link></PromptWords>
                </TooltipContainer>
              </TouchableOpacity>:
              <PromptWords><AntDesign name="infocirlceo" size={px2dp(8)} color="#ACA9A9" />当前系统处于离线模式</PromptWords>
            }
            <Title>宝宝列表</Title>
            <TouchableOpacity activeOpacity={0.8} onPress={openTooltip}>
              <TooltipContainer>
                <Tooltip>请注意</Tooltip>
                <AntDesign name="infocirlceo" size={px2dp(8)} color="#ff794f" />
              </TooltipContainer>
            </TouchableOpacity>
          </TitleContainer>
          <Button onPress={() => navigate('CreateBabyStep1')} title="添加宝宝" />
        </ListHeader>
      )}

      <Modal
        hideCancel
        visible={tooltip}
        onOk={closeTooltip}
        okText="知道了"
        title="提示"
        contentText="预产日期已过时请联系并确认是否已出生，若已出生则修改宝宝为已出生并填写准确的出生日期，若尚未出生请修改并延长预产日期。注意：当宝宝成长阶段由待产期调为已出生后不可改回待产期。"
      />

      <FlatList
        ListEmptyComponent={
          !refreshing &&
          !loading && (
            <NoDataContainer>
              {name ? (
                <NoData title="暂无匹配的宝宝信息" />
              ) : (
                <>
                  <NoData title="尚未添加宝宝信息" />
                  <Button title="添加宝宝" onPress={() => navigate('CreateBabyStep1')} />
                </>
              )}
            </NoDataContainer>
          )
        }
        ListFooterComponent={!refreshing && contents.length > 0 && <ListFooter loading={loading} />}
        refreshControl={
          <RefreshControl
            colors={Colors.colors}
            onRefresh={() => refresh()}
            refreshing={refreshing}
          />
        }
        data={contents}
        keyExtractor={(item) => item.id + ''}
        onEndReachedThreshold={0.4}
        onEndReached={handleLoadMore}
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
  margin-bottom: 2px;
`;

const PromptWords = styled.Text`
  font-size: 10px;
  color: #8e8e93;
  margin-bottom: 20px;
`;

const Link = styled.Text`
  font-size: 10px;
  color: #1717F3;
  margin-right: 2px;
`;

const Tooltip = styled.Text`
  font-size: 8px;
  color: #ff794f;
  margin-right: 2px;
`;

const TooltipContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const TitleContainer = styled.View``;

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
