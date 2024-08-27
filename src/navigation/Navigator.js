import React from "react";
import { useSelector } from "react-redux";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";

import { TabBarIcon, NavigatorHeader } from "../components";
import { px2dp, styled } from "../utils/styled";

import Babies from "../screens/Babies";
import Baby from "../screens/Baby";
import CreateBabyStep1 from "../screens/BabyForm/CreateBabyStep1";
import CreateBabyStep2 from "../screens/BabyForm/CreateBabyStep2";
import CreateBabyStep3 from "../screens/BabyForm/CreateBabyStep3";
import EditCarer from "../screens/BabyForm/EditCarer";
import EditBaby from "../screens/BabyForm/EditBaby";

import ChangePassword from "../screens/ChangePassword";
import Home from "../screens/Home";
import Me from "../screens/Me";
import SignIn from "../screens/SignIn";
import Visit from "../screens/Visit";
import Visits from "../screens/Visits";
import CreateVisit from "../screens/CreateVisit";
import PickBaby from "../screens/PickBaby";
import PickVisitTime from "../screens/PickVisitTime";
import LessonIntro from "../screens/LessonIntro";
import LessonModules from "../screens/LessonModules";
import Module from "../screens/Module";
import Question from "../screens/Question";
import EditAddress from "../screens/BabyForm/EditAddress";
import { useTranslation } from "react-i18next";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function StackNavigator() {
  const user = useSelector((state) => state.user);
  const { t } = useTranslation(["Navigator"]);

  const screens = [
    {
      name: "PickBaby",
      title: "选择宝宝",
      component: PickBaby,
    },
    {
      name: "PickVisitTime",
      title: "选择家访日期",
      component: PickVisitTime,
    },
    {
      name: "Visit",
      title: t("Visits:visitDetail"),
      component: Visit,
    },
    {
      name: "CreateVisit",
      title: "新建家访",
      component: CreateVisit,
    },
    {
      name: "Module",
      component: Module,
      headerShown: false,
    },
    {
      name: "Question",
      component: Question,
      headerShown: false,
    },
    {
      name: "LessonModules",
      component: LessonModules,
      headerShown: false,
    },
    {
      name: "LessonIntro",
      component: LessonIntro,
      headerShown: false,
    },
    {
      name: "Baby",
      component: Baby,
      headerShown: false,
    },
    {
      name: "CreateBabyStep1",
      headerShown: false,
      component: CreateBabyStep1,
    },
    {
      name: "CreateBabyStep2",
      headerShown: false,
      component: CreateBabyStep2,
    },
    {
      name: "EditCarer",
      title: "编辑看护人",
      component: EditCarer,
    },
    {
      name: "EditBaby",
      title: "修改宝宝信息",
      component: EditBaby,
    },
    {
      name: "EditAddress",
      title: "修改地址信息",
      component: EditAddress,
    },
    {
      name: "CreateCarer",
      title: "添加看护人",
      component: EditCarer,
    },
    {
      name: "CreateBabyStep3",
      headerShown: false,
      component: CreateBabyStep3,
    },
    {
      name: "ChangePassword",
      title: t("resetPassword"),
      component: ChangePassword,
    },
  ];

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
          <Stack.Screen
            name="Main"
            component={HomeTabs}
            options={{ headerShown: false }}
          />
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
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarStyle: [
          {
            display: "flex",
            height: px2dp(68),
            borderTopWidth: 1,
            borderTopColor: "#FFC3A0",
          },
          null,
        ],
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
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
          headerShown: false,
          tabBarLabel: ({ focused }) => (
            <TabBarLabel focused={focused}>{t("babyList")}</TabBarLabel>
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="baby" />
          ),
        }}
      />
      <Tab.Screen
        name="Visits"
        component={Visits}
        options={{
          headerShown: false,
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
          headerShown: false,
          tabBarLabel: ({ focused }) => (
            <TabBarLabel focused={focused}>{t("account")}</TabBarLabel>
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
  font-weight: ${({ focused }) => (focused ? "bold" : "normal")};
  padding-bottom: ${({ focused }) => (focused ? 8 : 12)}px;
  color: ${({ focused }) => (focused ? "#FF9472" : "#FF794F")};
`;
