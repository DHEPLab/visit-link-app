import React, { useState } from 'react';
import { Image, Text, View, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';

import { useFetch } from '../utils';
import { Colors } from '../constants';
import { styled } from '../utils/styled';
import { Gender, BabyStage, FamilyTies } from '../constants/enums';
import { GhostNavigatorHeader, Button, Card, StaticField } from '../components';

export default function () {
  const navigation = useNavigation();
  const { params } = useRoute();
  const [index, setIndex] = useState(0);

  const [baby] = useFetch(`/api/baby/${params.id}`);
  const [carers] = useFetch(`/api/baby/${params.id}/carer`, {}, []);

  return (
    <>
      <Header {...Colors.linearGradient}>
        <GhostNavigatorHeader navigation={navigation} title="宝宝详情" />
        {/*TOTO Change image*/}
        <BackgroundImage source={require('../assets/images/me-bg.png')} />
        <Baby>
          <NameContainer>
            <Name>{params.name}</Name>
            <Identity>ID: {params.identity}</Identity>
          </NameContainer>
          <InfoContainer>
            <View>
              <Age>
                {Gender[params.gender]} {BabyStage[params.stage]}/{params.month}个月
              </Age>
            </View>
            <Button ghost title="修改资料" />
          </InfoContainer>
        </Baby>
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
    </>
  );
}

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
  height: 148px;
  width: 220px;
  right: 0;
  bottom: 0;
`;

const InfoContainer = styled.View`
  margin-top: 20px;
  flex-direction: row;
  justify-content: space-between;
`;

const Baby = styled.View`
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
  return <Text>家访</Text>;
}

function Family({ baby, carers }) {
  return (
    <CardContainer contentContainerStyle={{ paddingVertical: 20 }}>
      <Card title="备注信息">
        <StaticField>{baby.remark}</StaticField>
      </Card>
      <Card title="地址信息">
        <StaticField label="所在地区">吉林省/延边朝鲜自治州/安图县</StaticField>
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
