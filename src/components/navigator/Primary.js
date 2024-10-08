import React from "react";
import { TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import Icons from "../elements/Icons";
import { Colors } from "../../constants";
import { styled } from "../../utils/styled";
import { useTranslation } from "react-i18next";

export default function ({ navigation, options }) {
  function goBack() {
    navigation.goBack();
  }

  const { t } = useTranslation("Common");

  return (
    <Header start={[0, 0]} end={[1, 1]} colors={Colors.colors}>
      {navigation.canGoBack() && (
        <Back onPress={() => goBack()}>
          <Icons
            name="arrow"
            size={8}
            style={{ transform: [{ rotate: "180deg" }] }}
          />
          <BackText>{t("back")}</BackText>
        </Back>
      )}
      <Title>{options.headerTitle || "Title"}</Title>
    </Header>
  );
}

const Header = styled(LinearGradient)`
  height: 56px;
  width: 100%;
  position: relative;
`;

const Title = styled.Text`
  color: #fff;
  font-size: 12px;
  font-weight: bold;
  margin-top: 28px;
  align-self: center;
`;

const Back = styled(TouchableOpacity)`
  position: absolute;
  flex-direction: row;
  align-items: center;
  top: 18px;
  left: 12px;
  padding: 12px;
  z-index: 99;
`;

const BackText = styled.Text`
  margin-left: 8px;
  font-size: 10px;
  color: #fff;
  font-weight: bold;
`;
