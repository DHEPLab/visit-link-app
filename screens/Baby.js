import React, { useState } from 'react';
import { Image, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';

import { GhostNavigatorHeader, Button } from '../components';
import { Layout, Colors } from '../constants';
import { styled } from '../utils/styled';

const initialLayout = { width: Layout.window.width };

export default function TabViewExample() {
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'visit', title: '家访记录' },
    { key: 'family', title: '家庭信息' },
  ]);

  return (
    <>
      <Header {...Colors.linearGradient}>
        <GhostNavigatorHeader navigation={navigation} title="宝宝详情" />
        {/*TOTO Change image*/}
        <BackgroundImage source={require('../assets/images/me-bg.png')} />
        <Baby>
          <NameContainer>
            <Name>张三</Name>
            <Identity>ID:66684888</Identity>
          </NameContainer>
          <InfoContainer>
            <View>
              <Age>男 婴幼期/16个月</Age>
            </View>
            <Button ghost title="修改资料" />
          </InfoContainer>
        </Baby>
      </Header>
      <TabView
        renderTabBar={renderTabBar}
        navigationState={{ index, routes }}
        renderScene={SceneMap({
          visit: Visit,
          family: Family,
        })}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
      />
    </>
  );
}

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

function renderTabBar(props) {
  return (
    <TabBar
      {...props}
      labelStyle={{ color: '#FF794F' }}
      indicatorStyle={{ backgroundColor: '#FF794F' }}
      style={{ backgroundColor: '#fff' }}
    />
  );
}

function Visit() {
  return <Text>家访</Text>;
}

function Family() {
  return <Text>家庭信息</Text>;
}
