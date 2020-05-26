import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { px2dp, styled } from '../config/styled';

import TabBarIcon from '../components/TabBarIcon';
import {
  HomeScreen,
  BabiesScreen,
  VisitScreen,
  SessionScreen,
  MeScreen,
} from '../screens/*';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const INITIAL_ROUTE_NAME = 'Home';

function HomeStackScreen() {
  return (
    <HomeStack.Navigator mode="modal" headerMode="none">
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Session" component={SessionScreen} />
    </HomeStack.Navigator>
  );
}

export default function () {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  // navigation.setOptions({ headerTitle: getHeaderTitle(route) });

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
            <TabBarIcon focused={focused} name="md-star" />
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
            <TabBarIcon focused={focused} name="md-people" />
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
            <TabBarIcon focused={focused} name="md-time" />
          ),
        }}
      />
      <Tab.Screen
        name="Me"
        component={MeScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarLabel focused={focused}>个人中心</TabBarLabel>
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-person" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const TabBarLabel = styled.Text`
  font-size: 8px;
  font-weight: ${(props) => (props.focused ? 'bold' : 'normal')};
  padding-bottom: 12px;
  color: ${(props) => (props.focused ? '#FF9472' : '#FF794F')};
`;

function getHeaderTitle(route) {
  const routeName =
    route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return 'How to get started';
    case 'Links':
      return 'Links to learn more';
  }
}
