import React, { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FlatList, Image, View, ScrollView, TouchableOpacity, ToastAndroid } from 'react-native';

import http from '../utils/http';
import { useFetch, useManualFetchArray, useBoolState } from '../utils';
import { Colors } from '../constants';
import { styled, px2dp } from '../utils/styled';
import { GenderIcon, BabyStage, FeedingPattern } from '../constants/enums';
import {
  VisitItem,
  GhostNavigatorHeader,
  Button,
  Card,
  StaticField,
  NoData,
  ApproveStatus,
  CarerItem,
  Modal,
  Input,
} from '../components';
import { useMethods } from './BabyForm/CreateBabyStep2';

export default function Baby({ navigation, route }) {
  const { params } = route;
  const [index, setIndex] = useState(params?.tab === 'family' ? 1 : 0);

  const [started, setStarted] = useState(false);
  const [baby, refreshBaby] = useFetch(`/api/babies/${params.id}`);
  const [carers, refreshCarers] = useFetch(`/api/babies/${params.id}/carers`, {}, []);
  const [visits, refreshVisits] = useManualFetchArray(`/api/babies/${params.id}/visits`, {
    started: false,
  });

  useEffect(() => navigation.addListener('focus', () => refreshVisits({ started })), [navigation]);
  // on change address
  useEffect(() => {
    if (route.params.address) {
      http.put(`/api/babies/${params.id}/address`, route.params.address).then(onRefresh);
    }
  }, [route.params.address]);
  // on change baby basic info
  useEffect(() => {
    if (route.params.baby) {
      http.put(`/api/babies/${params.id}`, route.params.baby).then(onRefresh);
    }
  }, [route.params.baby]);
  useEffect(() => {
    if (!route.params.carer) return;
    route.params.carerIndex === -1
      ? // create new carer
        http.post(`/api/babies/${params.id}/carers`, params.carer).then(onRefresh)
      : // edit old carer
        http
          .put(`/api/babies/${params.id}/carers/${params.carer.id}`, params.carer)
          .then(onRefresh);
  }, [route.params.carer]);

  function onChangeVisitTab(_started) {
    setStarted(_started);
    refreshVisits({ started: _started });
  }

  function onRefresh() {
    refreshBaby();
    refreshCarers();
  }

  function handleCreateVisit() {
    http
      .get(`/api/babies/${baby.id}/lesson`)
      .then((_) =>
        navigation.navigate('CreateVisit', {
          lockBaby: true,
          baby: {
            ...baby,
            months: baby.months,
            carerName: carers[0]?.name,
            carerPhone: carers[0]?.phone,
          },
        })
      )
      .catch((_) => ToastAndroid.show('没有匹配的课堂，无法新建家访', ToastAndroid.LONG));
  }

  return (
    <>
      <Header {...Colors.linearGradient}>
        <GhostNavigatorHeader navigation={navigation} title="宝宝详情" />
        <BackgroundImage source={require('../assets/images/baby-header-bg.png')} />
        <BabyContainer>
          <NameContainer>
            <Name>{baby.name || params.name}</Name>
            <IdentityContainer>
              <ApproveStatus approved={baby.approved} />
              <Identity>ID: {baby.identity || params.identity || '暂无'}</Identity>
            </IdentityContainer>
          </NameContainer>
          <InfoContainer>
            <View>
              <Stage>
                <MaterialCommunityIcons
                  name={GenderIcon[baby.gender || params.gender]}
                  size={px2dp(12)}
                  color="#fff"
                />
                <Age>
                  {BabyStage[baby.stage || params.stage]} {baby.months || params.months}个月
                </Age>
              </Stage>
              {baby.feedingPattern && (
                <FeedingPatternContainer>
                  <FeedingPatternLabel>喂养状态：</FeedingPatternLabel>
                  <FeedingPatternValue>{FeedingPattern[baby.feedingPattern]}</FeedingPatternValue>
                </FeedingPatternContainer>
              )}
            </View>
            <Button
              ghost
              title="修改资料"
              onPress={() => navigation.navigate('EditBaby', { from: 'Baby', baby })}
            />
          </InfoContainer>
        </BabyContainer>
      </Header>

      <TabView
        navigationState={{
          index,
          routes: [
            { key: 'Visits', title: '家访记录' },
            { key: 'Family', title: '家庭信息' },
          ],
        }}
        onIndexChange={setIndex}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            labelStyle={{ color: '#FF794F' }}
            indicatorStyle={{ backgroundColor: '#FF794F' }}
            style={{ backgroundColor: '#fff' }}
          />
        )}
        renderScene={SceneMap({
          Visits: () => (
            <Visits
              onCreateVisit={handleCreateVisit}
              onChange={onChangeVisitTab}
              dataSource={visits}
              started={started}
              navigation={navigation}
            />
          ),
          Family: () => (
            <Family baby={baby} carers={carers} navigation={navigation} onRefresh={onRefresh} />
          ),
        })}
      />
    </>
  );
}

const IdentityContainer = styled.View`
  align-items: flex-end;
  opacity: 0.6;
`;

const FeedingPatternContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 4px;
`;

const FeedingPatternLabel = styled.Text`
  color: #fff;
  font-size: 10px;
`;

const FeedingPatternValue = styled.Text`
  background: #ffede2;
  border-radius: 2px;
  color: #ff794f;
  padding: 2px 4px;
  font-size: 8px;
`;

const Stage = styled.View`
  flex-direction: row;
  align-items: center;
`;

function Visits({ started, dataSource, onChange, navigation, onCreateVisit }) {
  return (
    <VisitsContainer>
      <VisitTabs>
        <TouchableOpacity onPress={() => onChange(false)} activeOpacity={0.8}>
          <VisitTab active={!started}>计划中的家访</VisitTab>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onChange(true)} activeOpacity={0.8}>
          <VisitTab active={started}>已完成家访</VisitTab>
        </TouchableOpacity>
      </VisitTabs>
      <FlatList
        ListEmptyComponent={<NoData title="没有相关结果" />}
        data={dataSource}
        keyExtractor={(item) => item.id + ''}
        renderItem={({ item }) => (
          <VisitItem onPress={() => navigation.navigate('Visit', { id: item.id })} value={item} />
        )}
      />
      <FixedButtonContainer>
        <Button size="large" title="新建家访" onPress={onCreateVisit} />
      </FixedButtonContainer>
    </VisitsContainer>
  );
}

function Family({ baby, carers, navigation, onRefresh }) {
  const [remark, setRemark] = useState(baby.remark);
  const [deleteId, setDeleteId] = useState();

  const [remarkVisible, openRemark, closeRemark] = useBoolState();
  const [deleteVisible, openDelete, closeDelete] = useBoolState();
  const { familyTies } = useMethods();

  function handleChangeMaster(carer) {
    http
      .put(`/api/babies/${baby.id}/carers/${carer.id}`, {
        ...carer,
        master: true,
      })
      .then(onRefresh);
  }

  function handleDelete() {
    http.delete(`/api/babies/${baby.id}/carers/${deleteId}`).then(onRefresh);
  }

  function handleChangeRemark() {
    http.put(`/api/babies/${baby.id}/remark`, { remark }).then(() => {
      onRefresh();
      closeRemark();
    });
  }

  return (
    <CardContainer contentContainerStyle={{ paddingVertical: 20 }}>
      <Card
        title="备注信息"
        hideBody={!baby.remark}
        right={<Button title={baby.remark ? '修改' : '添加'} onPress={openRemark} />}
      >
        <StaticField>{baby.remark}</StaticField>
      </Card>

      <Card
        title="地址信息"
        right={
          <Button
            title="修改"
            onPress={() =>
              navigation.navigate('EditAddress', {
                from: 'Baby',
                address: { area: baby.area, location: baby.location },
              })
            }
          />
        }
      >
        <StaticField label="所在地区">{baby.area}</StaticField>
        <StaticField label="详细地址">{baby.location}</StaticField>
      </Card>

      <Card
        title="看护人信息"
        noPadding
        right={
          <Button
            title="添加"
            disabled={carers.length > 3}
            onPress={() =>
              navigation.navigate('CreateCarer', {
                from: 'Baby',
                filterFamilyTies: familyTies(carers),
              })
            }
          />
        }
      >
        <CarersContainer>
          {carers.map((carer, index) => (
            <CarerItem
              key={carer.id}
              value={carer}
              number={index + 1}
              noBorder={index === carers.length - 1}
              onChangeMaster={() => handleChangeMaster(carer)}
              onPressDelete={() => {
                if (carer.master) {
                  ToastAndroid.show('主看护人不可删除', ToastAndroid.LONG);
                  return;
                }
                setDeleteId(carer.id);
                openDelete();
              }}
              onPressModify={() =>
                navigation.navigate('EditCarer', {
                  carer,
                  carerIndex: index,
                  from: 'Baby',
                  filterFamilyTies: familyTies(carers, carer.familyTies),
                })
              }
            />
          ))}
        </CarersContainer>
      </Card>

      <Modal
        title="添加备注信息"
        visible={remarkVisible}
        content={
          <Input
            value={remark}
            onChangeText={setRemark}
            border
            placeholder="请输入宝宝的备注信息"
          />
        }
        onCancel={closeRemark}
        onOk={handleChangeRemark}
      />
      <Modal
        title="删除此看护人"
        visible={deleteVisible}
        contentText="确认要删除此看护人？"
        okText="删除"
        cancelText="取消"
        onCancel={closeDelete}
        onOk={handleDelete}
      />
    </CardContainer>
  );
}

const CarersContainer = styled.View`
  padding: 0 24px;
`;

const FixedButtonContainer = styled.View`
  position: absolute;
  bottom: 0;
  width: 400px;
  display: flex;
  padding-top: 10px;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.49);
`;

const NameContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`;

const BackgroundImage = styled(Image)`
  position: absolute;
  height: 134px;
  width: 140px;
  right: 0;
  bottom: 0;
`;

const InfoContainer = styled.View`
  margin-top: 20px;
  flex-direction: row;
  justify-content: space-between;
`;

const BabyContainer = styled.View`
  padding: 0 28px;
`;

const WhiteText = styled.Text`
  color: #fff;
`;

const Name = styled(WhiteText)`
  font-size: 20px;
  font-weight: bold;
  margin-top: 10px;
`;

const Identity = styled(WhiteText)`
  margin-top: 4px;
  font-size: 10px;
`;

const Age = styled(WhiteText)`
  margin-left: 4px;
  font-size: 10px;
`;

const Header = styled(LinearGradient)`
  height: 160px;
  width: 100%;
`;

const VisitsContainer = styled.View`
  padding: 20px 28px;
  position: relative;
  flex: 1;
`;

const VisitTabs = styled.View`
  padding-bottom: 24px;
  flex-direction: row;
`;

const VisitTab = styled.Text`
  font-size: 12px;
  margin-right: 16px;
  color: #525252;
  ${({ active }) =>
    active &&
    `
    font-weight: bold;
    border-bottom-width: 2px;
    border-color: #FFC3A0;
  `}
`;

const CardContainer = styled(ScrollView)`
  padding: 0 28px;
  padding-bottom: 60px;
`;
