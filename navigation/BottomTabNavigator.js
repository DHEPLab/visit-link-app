import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { px2dp, styled } from '../config/styled';

import { TabBarIcon, NavigatorHeader } from '../components/*';
import {
  HomeScreen,
  BabiesScreen,
  VisitScreen,
  SessionScreen,
  MeScreen,
  ChangeProfile,
} from '../screens/*';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const MeStack = createStackNavigator();
const INITIAL_ROUTE_NAME = 'Home';

function HomeStackScreen() {
  return (
    <HomeStack.Navigator mode="modal" headerMode="none">
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Session" component={SessionScreen} />
    </HomeStack.Navigator>
  );
}

function MeStackScreen() {
  return (
    <MeStack.Navigator mode="card">
      <MeStack.Screen
        name="Me"
        component={MeScreen}
        options={{ headerShown: false }}
      />
      <MeStack.Screen
        name="ChangeProfile"
        component={ChangeProfile}
        options={{
          headerTitle: '修改个人资料',
          header: NavigatorHeader,
        }}
      />
    </MeStack.Navigator>
  );
}

export default function () {
  return (
    <Tab.Navigator
      initialRouteName={INITIAL_ROUTE_NAME}
      tabBarOptions={{
        style: {
          height: px2dp(68),
          borderTopWidth: 1,
          borderTopColor: '#FFC3A0',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarLabel focused={focused}>首页</TabBarLabel>
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="home" />
          ),
        }}
      />
      <Tab.Screen
        name="Babies"
        component={BabiesScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarLabel focused={focused}>宝宝列表</TabBarLabel>
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="baby" />
          ),
        }}
      />
      <Tab.Screen
        name="Visit"
        component={VisitScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarLabel focused={focused}>家访安排</TabBarLabel>
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="visit" />
          ),
        }}
      />
      <Tab.Screen
        name="Me"
        component={MeStackScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarLabel focused={focused}>个人中心</TabBarLabel>
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="me" />
          ),
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
