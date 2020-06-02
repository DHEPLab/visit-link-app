import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { px2dp, styled } from '../config/styled';

import { TabBarIcon, NavigatorHeader } from '../components/*';
import { Home, Babies, Visit, Session, Me, ChangeProfile } from '../screens/*';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function () {
  return (
    <Stack.Navigator mode="card">
      <Stack.Screen
        name="Home"
        component={HomeTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Session" component={Session} />
      <Stack.Screen
        name="ChangeProfile"
        component={ChangeProfile}
        options={{
          headerTitle: '修改个人资料',
          header: NavigatorHeader,
        }}
      />
    </Stack.Navigator>
  );
}

function HomeTabs() {
  return (
    <Tab.Navigator
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
        component={Home}
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
        component={Babies}
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
        component={Visit}
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
        component={Me}
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
