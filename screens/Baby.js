import React, { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import NetInfo from '@react-native-community/netinfo';
import { FlatList, Image, View, ScrollView, TouchableOpacity, ToastAndroid } from 'react-native';

import http from '../utils/http';
import { useFetch, useManualFetch, useBoolState } from '../utils';
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
  LargeButtonContainer,
  Message,
} from '../components';
import { useMethods } from './BabyForm/CreateBabyStep2';

export default function Baby({ navigation, route }) {
  const { params } = route;
  const [index, setIndex] = useState(params?.tab === 'family' ? 1 : 0);

  const [started, setStarted] = useState(false);
  const [baby, refreshBaby] = useFetch(`/api/babies/${params.id}`, {}, params);
  const [carers, refreshCarers] = useFetch(`/api/babies/${params.id}/carers`, {}, params?.allCarerList || []);
  const [babyVisits, refreshBabyVisits] = useManualFetch(`/api/babies/${params.id}/visits`);

  const [messageVisble, openMessage, closeMessage] = useBoolState();
  const [errorMessageVisble, openErrorMessage, closeErrorMessage] = useBoolState();
  const [connect, isConnect, isNotConnect] = useBoolState();
  const [errorMessage, setErrorMessage] = useState();

  useEffect(
    () =>
      navigation.addListener('focus', () => {
        refreshBabyVisits();
        refreshConnect();
      }),
    [navigation]
  );

  useEffect(() => {
    if (!route.params.success) return;
    onSubmitSuccess();
  }, [route.params.success]);

  function onSubmitSuccess() {
    onRefresh();
    openMessage();
  }

  function onRefresh() {
    if (connect) {
      refreshBaby();
      refreshCarers();
    }
  }

  function refreshConnect () {
    NetInfo.fetch().then(({ isConnected }) => {
      if (!isConnected) {
        isNotConnect()
      } else {
        isConnect()
      }
    })
  }

  function handleCreateVisit() {
    if (connect) {
      http
        .silenceGet(`/api/babies/${baby.id}/lesson`)
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
        .catch((error) => {
          setErrorMessage(error.detail)
          openErrorMessage()
        });
    } else {
      // if (baby?.nextShouldVisitDTO) {
        navigation.navigate('CreateVisit', {
          lockBaby: true,
          baby: {
            ...baby,
            months: baby.months,
            carerName: carers[0]?.name,
            carerPhone: carers[0]?.phone
          }
        })
      // } else {
      //   setErrorMessage('没有匹配的课堂，无法创建家访!')
      //   openErrorMessage()
      // }
    }
  }

  return (
    <>
      <Header {...Colors.linearGradient}>
        <Message
          visible={messageVisble}
          buttonText="知道了"
          onButtonPress={closeMessage}
          title="提交成功"
          content="宝宝信息修改需要经过您的督导员审核，如需尽快审核，请直接联系您的督导员。"
        />
        <Message
          error
          visible={errorMessageVisble}
          buttonText="知道了"
          onButtonPress={closeErrorMessage}
          title="无法新建家访"
          content={errorMessage}
        />
        <GhostNavigatorHeader navigation={navigation} title="宝宝详情" />
        <BackgroundImage source={require('../assets/images/baby-header-bg.png')} />
        <BabyContainer>
          <NameContainer>
            <Name>{baby.name || params.name}</Name>
            <IdentityContainer>
              <ApproveStatus approved={baby.approved == null ? params.approved : baby.approved} />
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
                  {params.pastEdc
                    ? '宝宝预产期已到'
                    : `${BabyStage[baby.stage || params.stage]} ${baby.days || params.days} 天`}
                </Age>
              </Stage>
              {baby.feedingPattern && (
                <FeedingPatternContainer>
                  <FeedingPatternLabel>喂养状态：</FeedingPatternLabel>
                  <FeedingPatternValue>{FeedingPattern[baby.feedingPattern]}</FeedingPatternValue>
                </FeedingPatternContainer>
              )}
            </View>
            {baby.identity && 
              <Button
                ghost
                title="修改资料"
                onPress={() => navigation.navigate('EditBaby', { from: 'Baby', baby, id: params.id })}
              />}
          </InfoContainer>
        </BabyContainer>
      </Header>

      <TabView
        onIndexChange={setIndex}
        navigationState={{
          index,
          routes: [
            { key: 'Visits', title: '家访记录' },
            { key: 'Family', title: '家庭信息' },
          ],
        }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: '#FF794F' }}
            style={{ backgroundColor: '#fff' }}
            renderLabel={({ route, focused }) => (
              <TabBarLabelContainer>
                <TabBarLabel focused={focused}>{route.title}</TabBarLabel>
                {route.key === 'Visits' && babyVisits.numberOfNoRemark > 0 && (
                  <NumberOfNoRemark>{babyVisits.numberOfNoRemark}</NumberOfNoRemark>
                )}
              </TabBarLabelContainer>
            )}
          />
        )}
        renderScene={SceneMap({
          Visits: () => (
            <Visits
              connect={connect}
              onCreateVisit={handleCreateVisit}
              onChange={setStarted}
              notStartedVisits={babyVisits.notStarted}
              startedVisits={babyVisits.started}
              numberOfNoRemark={babyVisits.numberOfNoRemark}
              started={started}
              navigation={navigation}
              approved={baby.approved}
            />
          ),
          Family: () => (
            <Family baby={baby} carers={carers} connect={connect} navigation={navigation} onRefresh={onRefresh} />
          ),
        })}
      />
    </>
  );
}

const TabBarLabelContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const TabBarLabel = styled.Text`
  font-size: 12px;
  color: #ff794f;
  font-weight: ${({ focused }) => (focused ? 'bold' : 'normal')};
`;

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

function Visits({
  started,
  connect,
  startedVisits,
  notStartedVisits,
  numberOfNoRemark,
  onChange,
  navigation,
  onCreateVisit,
  approved,
}) {
  function handlePressVisit(item) {
    if (!approved && item.status === 'NOT_STARTED') {
      ToastAndroid.show('请等待宝宝完成审核', ToastAndroid.SHORT);
      return;
    }
    navigation.navigate('Visit', { id: item.id });
  }

  function redDot(item) {
    return (item.status === 'EXPIRED' || item.status === 'UNDONE') && item.remark == null;
  }

  return (
    <VisitsContainer>
      {!connect && <PromptWords><AntDesign name="infocirlceo" size={px2dp(8)} color="#ACA9A9" />当前系统处于离线模式</PromptWords>}
      <VisitTabs>
        <TouchableOpacity onPress={() => onChange(false)} activeOpacity={0.8}>
          <VisitTab active={!started}>计划中的家访</VisitTab>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onChange(true)} activeOpacity={0.8}>
          <TitleContainer>
            <VisitTab active={started}>已完成/未完成/已过期家访</VisitTab>
            {numberOfNoRemark > 0 && (
              <NumberOfNoRemark active={started}>{numberOfNoRemark}</NumberOfNoRemark>
            )}
          </TitleContainer>
        </TouchableOpacity>
      </VisitTabs>
      <FlatList
        ListEmptyComponent={<NoData title="没有相关结果" />}
        data={started ? startedVisits : notStartedVisits}
        keyExtractor={(item) => item.id + ''}
        renderItem={({ item }) => (
          <VisitItem onPress={() => handlePressVisit(item)} value={item} redDot={redDot(item)} />
        )}
      />
      <FixedButtonContainer>
        <Button size="large" disabled={!approved} title="新建家访" onPress={onCreateVisit} />
      </FixedButtonContainer>
    </VisitsContainer>
  );
}

const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-left: 16px;
`;

const NumberOfNoRemark = styled.Text`
  font-size: 8px;
  color: #565656;
  padding: 0 3px;
  height: 12px;
  line-height: 12px;
  border-radius: 5px;
  background: #d8d8d8;
  margin-left: 4px;
  font-weight: bold;
  ${({ active }) =>
    active &&
    `
    margin-bottom: 2px;
  `}
`;

function Family({ baby, carers, connect, navigation, onRefresh }) {
  const [remark, setRemark] = useState(baby.remark);
  const [closeAccountReason, setCloseAccountReason] = useState();
  const [deleteId, setDeleteId] = useState();

  const [remarkVisible, openRemark, closeRemark] = useBoolState();
  const [deleteVisible, openDelete, closeDelete] = useBoolState();
  const [closeAccountVisible, openCloseAccount, closeCloseAccount] = useBoolState();
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

  function handleCloseAccount() {
    http.put(`/api/babies/${baby.id}/close`, { reason: closeAccountReason }).then(() => {
      onRefresh();
      closeCloseAccount();
    });
  }

  return (
    <CardContainer contentContainerStyle={{ paddingVertical: 20 }}>
      <Card
        title="备注信息"
        hideBody={!baby.remark}
        right={<Button disabled={!connect ||!baby.id} title={baby.remark ? '修改' : '添加'} onPress={openRemark} />}
      >
        <StaticField>{baby.remark}</StaticField>
      </Card>

      <Card
        title="地址信息"
        right={
          <Button
            title="修改"
            disabled={!connect || !baby.id}
            onPress={() =>
              navigation.navigate('EditAddress', {
                id: baby.id,
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
            disabled={!connect || !baby.id || carers.length > 3}
            onPress={() =>
              navigation.navigate('CreateCarer', {
                from: 'Baby',
                babyId: baby.id,
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
              disabled={!connect || !baby.id}
              noBorder={index === carers.length - 1}
              onChangeMaster={() => handleChangeMaster(carer)}
              onPressDelete={() => {
                if (carer.master) {
                  ToastAndroid.show('需重新设置主看护人再进行此操作', ToastAndroid.LONG);
                  return;
                }
                setDeleteId(carer.id);
                openDelete();
              }}
              onPressModify={() =>
                navigation.navigate('EditCarer', {
                  babyId: baby.id,
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

      {baby.actionFromApp !== 'DELETE' && (
        <LargeButtonContainer>
          <Button type="weaken" title="注销宝宝" disabled={!connect || !baby.id} onPress={openCloseAccount} />
        </LargeButtonContainer>
      )}

      <Modal
        title="你是否要注销宝宝账户？"
        visible={closeAccountVisible}
        content={
          <Input
            value={closeAccountReason}
            onChangeText={setCloseAccountReason}
            border
            placeholder="请输入宝宝的注销原因"
          />
        }
        onCancel={closeCloseAccount}
        onOk={handleCloseAccount}
        okText="注销"
        disableOk={!closeAccountReason}
      />
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
  padding-bottom: 45px;
  position: relative;
  flex: 1;
`;

const VisitTabs = styled.View`
  padding-bottom: 24px;
  flex-direction: row;
`;

const VisitTab = styled.Text`
  font-size: 12px;
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

const PromptWords = styled.Text`
  font-size: 10px;
  color: #8e8e93;
  margin-bottom: 2px;
`;
