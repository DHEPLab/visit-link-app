import React from "react";
import { FlatList, RefreshControl } from "react-native";

import { Colors } from "../constants";
import { styled } from "../utils/styled";
import { BabyItem, NoData } from "../components";
import { useFetch } from "../utils";
import { useTranslation } from "react-i18next";

export default function PickBaby({ navigation, route }) {
  const [babies, refresh, refreshing] = useFetch(
    "/api/babies/available-for-visit",
    {
      visitDate: route.params.visitDate,
    },
    [],
  );

  function pick(baby) {
    navigation.navigate("CreateVisit", {
      baby,
      ...(route.params.prevParams || {}),
    });
  }

  const { t } = useTranslation();
  return (
    <Container>
      <Hint>{t("Visits:selectBabyMessage")}</Hint>
      <FlatList
        ListEmptyComponent={<NoData title={t("Visits:emptyBaby")} />}
        refreshControl={
          <RefreshControl
            colors={Colors.colors}
            onRefresh={() => refresh()}
            refreshing={refreshing}
          />
        }
        data={babies}
        keyExtractor={(item) => item.id + ""}
        renderItem={({ item }) => (
          <BabyItem onPress={() => pick(item)} {...item} />
        )}
      />
    </Container>
  );
}

const Container = styled.View`
  margin: 20px 28px;
`;

const Hint = styled.Text`
  color: #8e8e93;
  font-size: 10px;
  margin-bottom: 24px;
`;
