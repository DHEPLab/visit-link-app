import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

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

export default function ({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  // navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <Tab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-star" />
          ),
        }}
      />
      <Tab.Screen
        name="Babies"
        component={BabiesScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-people" />
          ),
        }}
      />
      <Tab.Screen
        name="Visit"
        component={VisitScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-time" />
          ),
        }}
      />
      <Tab.Screen
        name="Me"
        component={MeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-person" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

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
