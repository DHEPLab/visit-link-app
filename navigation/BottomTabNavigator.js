import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import Babies from '../screens/Babies';
import Baby from '../screens/Baby';
import ChangePassword from '../screens/ChangePassword';
import Home from '../screens/Home';
import Me from '../screens/Me';
import Session from '../screens/Session';
import SignIn from '../screens/SignIn';
import Visit from '../screens/Visit';
import CurriculumIntro from '../screens/CurriculumIntro';
import CurriculumModules from '../screens/CurriculumModules';
import { TabBarIcon, NavigatorHeader } from '../components';
import { px2dp, styled } from '../utils/styled';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const screens = [
  {
    name: 'CurriculumModules',
    component: CurriculumModules,
    headerShown: false,
  },
  {
    name: 'CurriculumIntro',
    component: CurriculumIntro,
    headerShown: false,
  },
  {
    name: 'Session',
    title: '会话',
    component: Session,
  },
  {
    name: 'Baby',
    component: Baby,
    headerShown: false,
  },
  {
    name: 'ChangePassword',
    title: '修改账户密码',
    component: ChangePassword,
  },
];

export default function () {
  const user = useSelector((state) => state.user);

  return (
    <Stack.Navigator>
      {user.userToken != null ? (
        <>
          <Stack.Screen name="Home" component={HomeTabs} options={{ headerShown: false }} />
          {screens.map((screen) => (
            <Stack.Screen
              key={screen.name}
              name={screen.name}
              component={screen.component}
              options={{
                headerShown: screen.headerShown,
                headerTitle: screen.title,
                header: NavigatorHeader,
              }}
            />
          ))}
        </>
      ) : (
        <>
          <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
        </>
      )}
    </Stack.Navigator>
  );
}

function HomeTabs() {
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
        name="Visit"
        component={Visit}
        options={{
          tabBarLabel: ({ focused }) => <TabBarLabel focused={focused}>家访安排</TabBarLabel>,
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="visit" />,
        }}
      />
      <Tab.Screen
        name="Me"
        component={Me}
        options={{
          tabBarLabel: ({ focused }) => <TabBarLabel focused={focused}>个人中心</TabBarLabel>,
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
