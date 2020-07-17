import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FlatList, RefreshControl, Image, View, ScrollView, TouchableOpacity } from 'react-native';

import { useFetch } from '../utils';
import { Colors } from '../constants';
import { styled, px2dp } from '../utils/styled';
import { GenderIcon, BabyStage, FamilyTies } from '../constants/enums';
import { VisitCard, GhostNavigatorHeader, Button, Card, StaticField } from '../components';

export default function Baby({ navigation }) {
  const { params } = useRoute();
  const [index, setIndex] = useState(0);

  const [baby] = useFetch(`/api/babies/${params.id}`);
  const [carers] = useFetch(`/api/babies/${params.id}/carers`, {}, []);

  return (
    <>
      <Header {...Colors.linearGradient}>
        <GhostNavigatorHeader navigation={navigation} title="宝宝详情" />
        <BackgroundImage source={require('../assets/images/baby-header-bg.png')} />
        <BabyContainer>
          <NameContainer>
            <Name>{params.name}</Name>
            <Identity>ID: {params.identity}</Identity>
          </NameContainer>
          <InfoContainer>
            <View>
              <Age>
                <MaterialCommunityIcons
                  name={GenderIcon[params.gender]}
                  size={px2dp(12)}
                  color="#fff"
                />{' '}
                {BabyStage[params.stage]} {params.month}个月
              </Age>
            </View>
            {/* <Button ghost title="修改资料" /> */}
          </InfoContainer>
        </BabyContainer>
      </Header>
      <TabView
        navigationState={{ index, routes }}
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
          Visit,
          Family: () => <Family baby={baby} carers={carers} />,
        })}
      />
      <FixedButtonContainer>
        <Button
          size="large"
          title="新建家访"
          onPress={() => navigation.navigate('CreateVisit', { baby })}
        />
      </FixedButtonContainer>
    </>
  );
}

const FixedButtonContainer = styled.View`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.49);
`;

const routes = [
  { key: 'Visit', title: '家访记录' },
  { key: 'Family', title: '家庭信息' },
];

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
  margin-top: 16px;
`;

const Identity = styled(WhiteText)`
  font-size: 10px;
`;

const Age = styled(WhiteText)`
  font-size: 10px;
`;

const Header = styled(LinearGradient)`
  height: 160px;
  width: 100%;
`;

function Visit() {
  const [tab, setTab] = useState('NOT_STARTED');
  const [visits, setVisits] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    if (tab === 'NOT_STARTED') {
      setVisits([
        {
          status: 'NOT_STARTED',
          name: '课堂名称课堂名称课堂名称课堂名称',
          date: new Date(),
        },
      ]);
    } else {
      setVisits([
        {
          id: 1,
          status: 'UNDONE',
          name: '课堂名称称课堂名称课堂名称',
          date: new Date(),
        },
        {
          id: 2,
          status: 'EXPIRED',
          name: '课堂名称称课堂名称课堂名称',
          date: new Date(),
        },
        {
          id: 3,
          status: 'DONE',
          name: '课堂名称称课堂名称课堂名称',
          date: new Date(),
        },
      ]);
    }
  }, [tab]);

  return (
    <VisitsContainer>
      <VisitTabs>
        <TouchableOpacity onPress={() => setTab('NOT_STARTED')} activeOpacity={0.8}>
          <VisitTab active={tab === 'NOT_STARTED'}>计划中的家访</VisitTab>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTab('STARTED')} activeOpacity={0.8}>
          <VisitTab active={tab !== 'NOT_STARTED'}>已完成家访</VisitTab>
        </TouchableOpacity>
      </VisitTabs>
      <FlatList
        refreshControl={<RefreshControl colors={Colors.colors} />}
        data={visits}
        keyExtractor={(item) => item.id + ''}
        renderItem={({ item }) => (
          <VisitCard onPress={() => navigation.navigate('Visit')} value={item} />
        )}
      />
    </VisitsContainer>
  );
}

const VisitsContainer = styled.View`
  padding: 20px 28px;
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

function Family({ baby, carers }) {
  return (
    <CardContainer contentContainerStyle={{ paddingVertical: 20 }}>
      <Card title="备注信息">
        <StaticField>{baby.remark}</StaticField>
      </Card>
      <Card title="地址信息">
        <StaticField label="所在地区">{baby.area}</StaticField>
        <StaticField label="详细地址">{baby.location}</StaticField>
      </Card>
      <Card title="看护人信息">
        {carers.map((carer, index) => (
          <Carer
            key={carer.id}
            carer={carer}
            number={index + 1}
            noBorder={index === carers.length - 1}
          />
        ))}
      </Card>
    </CardContainer>
  );
}

function Carer({ number, carer, noBorder }) {
  return (
    <CarerItem noBorder={noBorder}>
      <CarerOperation>
        <CarerNumber>照料人 {number}</CarerNumber>
        {carer.master && <MasterCarer>主照料人</MasterCarer>}
      </CarerOperation>
      <StaticField label="照料人姓名">{carer.name}</StaticField>
      <StaticField label="亲属关系">{FamilyTies[carer.familyTies]}</StaticField>
      <StaticField label="联系电话">{carer.phone}</StaticField>
      <StaticField label="微信号码">{carer.wechat}</StaticField>
    </CarerItem>
  );
}

const CarerOperation = styled.View`
  flex-direction: row;
  margin-bottom: 12px;
`;

const CarerNumber = styled.Text`
  font-size: 10px;
  font-weight: bold;
  width: 50px;
`;

const MasterCarer = styled.Text`
  color: #8e8e93;
  font-size: 10px;
  margin-left: 12px;
`;

const CardContainer = styled(ScrollView)`
  padding: 0 28px;
`;

const CarerItem = styled.View`
  ${({ noBorder }) =>
    !noBorder &&
    `
  border-bottom-width: 1px;
  border-color: #eeeeee;
  margin-bottom: 10px;
  `}
`;
