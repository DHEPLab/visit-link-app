import React, { useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";

import Visits from "../utils/visit";
import storage from "../cache/storage";
import { Colors } from "../constants";
import { styled } from "../utils/styled";
import {
  GhostNavigatorHeader,
  BottomRightBackground,
  Button,
} from "../components";
import * as Location from "expo-location";
import { ToastAndroid } from "react-native";

export default function LessonIntro({ navigation, route }) {
  const [lesson] = storage.useLesson(route.params?.id);

  useEffect(() => {
    if (!route.params.preview) {
      storage.setUncommittedVisitStatus(
        route.params?.visitId,
        "UNDONE",
        Visits.formatDateTime(new Date()),
      );
      if (route.params.continue) {
        storage.setNextModule(route.params.nextModuleIndex);
      }
    }
  }, []);

  return (
    <Container {...Colors.linearGradient}>
      <BottomRightBackground
        width={280}
        height={268}
        source={require("../assets/images/curriculum-bg.png")}
      />
      <GhostNavigatorHeader navigation={navigation} />
      <TextContainer>
        <Name>{lesson.name}：</Name>
        <Description>{lesson.description}</Description>
      </TextContainer>
      <ButtonContainer>
        <Button
          type="info"
          title="下一步"
          onPress={() => {
            Location.requestForegroundPermissionsAsync().then(
              async ({ status }) => {
                if (status !== "granted") {
                  ToastAndroid.show(
                    "未授予获取用户位置的权限，无法进行家访任务！",
                    ToastAndroid.LONG,
                  );
                  navigation.goBack();
                  return;
                }
                const hasEnableLocation =
                  await Location.hasServicesEnabledAsync();
                if (!hasEnableLocation) {
                  ToastAndroid.show(
                    "未打开手机定位服务，无法进行家访任务！",
                    ToastAndroid.LONG,
                  );
                  return;
                }
                navigation.navigate("LessonModules", route.params);
              },
            );
          }}
        />
      </ButtonContainer>
    </Container>
  );
}

const TextContainer = styled.View`
  padding: 0 28px;
`;

const Container = styled(LinearGradient)`
  width: 100%;
  height: 100%;
  position: relative;
`;

const Name = styled.Text`
  width: 240px;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  margin-top: 24px;
`;

const Description = styled.Text`
  color: #fff;
  font-size: 10px;
  margin-top: 24px;
`;

const ButtonContainer = styled.View`
  position: absolute;
  bottom: 60px;
  width: 100%;
`;
