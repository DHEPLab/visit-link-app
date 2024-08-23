import React from 'react';
import { useSelector } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import { TabBarIcon, NavigatorHeader } from '../components';
import { px2dp, styled } from '../utils/styled';

import Babies from '../screens/Babies';
import Baby from '../screens/Baby';
import CreateBabyStep1 from '../screens/BabyForm/CreateBabyStep1';
import CreateBabyStep2 from '../screens/BabyForm/CreateBabyStep2';
import CreateBabyStep3 from '../screens/BabyForm/CreateBabyStep3';
import EditCarer from '../screens/BabyForm/EditCarer';
import EditBaby from '../screens/BabyForm/EditBaby';

import ChangePassword from '../screens/ChangePassword';
import Home from '../screens/Home';
import Me from '../screens/Me';
import SignIn from '../screens/SignIn';
import Visit from '../screens/Visit';
import Visits from '../screens/Visits';
import CreateVisit from '../screens/CreateVisit';
import PickBaby from '../screens/PickBaby';
import PickVisitTime from '../screens/PickVisitTime';
import LessonIntro from '../screens/LessonIntro';
import LessonModules from '../screens/LessonModules';
import Module from '../screens/Module';
import Question from '../screens/Question';
import EditAddress from '../screens/BabyForm/EditAddress';
import {useTranslation} from "react-i18next";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const screens = [
  {
    name: 'PickBaby',
    title: '选择宝宝',
    component: PickBaby,
  },
  {
    name: 'PickVisitTime',
    title: '选择家访日期',
    component: PickVisitTime,
  },
  {
    name: 'Visit',
    title: '家访详情',
    component: Visit,
  },
  {
    name: 'CreateVisit',
    title: '新建家访',
    component: CreateVisit,
  },
  {
    name: 'Module',
    component: Module,
    headerShown: false,
  },
  {
    name: 'Question',
    component: Question,
    headerShown: false,
  },
  {
    name: 'LessonModules',
    component: LessonModules,
    headerShown: false,
  },
  {
    name: 'LessonIntro',
    component: LessonIntro,
    headerShown: false,
  },
  {
    name: 'Baby',
    component: Baby,
    headerShown: false,
  },
  {
    name: 'CreateBabyStep1',
    headerShown: false,
    component: CreateBabyStep1,
  },
  {
    name: 'CreateBabyStep2',
    headerShown: false,
    component: CreateBabyStep2,
  },
  {
    name: 'EditCarer',
    title: '编辑看护人',
    component: EditCarer,
  },
  {
    name: 'EditBaby',
    title: '修改宝宝信息',
    component: EditBaby,
  },
  {
    name: 'EditAddress',
    title: '修改地址信息',
    component: EditAddress,
  },
  {
    name: 'CreateCarer',
    title: '添加看护人',
    component: EditCarer,
  },
  {
    name: 'CreateBabyStep3',
    headerShown: false,
    component: CreateBabyStep3,
  },
  {
    name: 'ChangePassword',
    title: '修改账户密码',
    component: ChangePassword,
  },
];

export default function StackNavigator() {
  const user = useSelector((state) => state.user);

  return (
      <Stack.Navigator>
        {user.userToken == null ? (
            <>
              <Stack.Screen
                  name="SignIn"
                  component={SignIn}
                  options={{
                    headerShown: false,
                  }}
              />
            </>
        ) : (
            <>
              <Stack.Screen name="Home" component={HomeTabs} options={{ headerShown: false }} />
              {screens.map((screen) => (
                  <Stack.Screen
                      key={screen.name}
                      name={screen.name}
                      component={screen.component}
                      options={{
                        header: NavigatorHeader,
                        headerTitle: screen.title,
                        headerShown: screen.headerShown,
                        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                      }}
                  />
              ))}
            </>
        )}
      </Stack.Navigator>
  );
}

function HomeTabs() {
  const { t } = useTranslation("Navigator");

  return (
      <Tab.Navigator
          tabBarOptions={{
            keyboardHidesTabBar: true,
            style: {
              height: px2dp(68),
              borderTopWidth: 1,
              borderTopColor: '#FFC3A0',
            },
          }}
      >
        <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarLabel: ({ focused }) => <TabBarLabel focused={focused}>首页</TabBarLabel>,
              tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="home" />,
            }}
        />
        <Tab.Screen
            name="Babies"
            component={Babies}
            options={{
              tabBarLabel: ({ focused }) => <TabBarLabel focused={focused}>宝宝列表</TabBarLabel>,
              tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="baby" />,
            }}
        />
        <Tab.Screen
            name="Visits"
            component={Visits}
            options={{
              tabBarLabel: ({ focused }) => <TabBarLabel focused={focused}>家访安排</TabBarLabel>,
              tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="visit" />,
            }}
        />
        <Tab.Screen
            name="Me"
            component={Me}
            options={{
              tabBarLabel: ({ focused }) => <TabBarLabel focused={focused}>t{('Account')}</TabBarLabel>,
              tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="me" />,
            }}
        />
      </Tab.Navigator>
  );
}

const TabBarLabel = styled.Text`
  font-size: 8px;
  font-weight: ${({ focused }) => (focused ? 'bold' : 'normal')};
  padding-bottom: ${({ focused }) => (focused ? 8 : 12)}px;
  color: ${({ focused }) => (focused ? '#FF9472' : '#FF794F')};
`;