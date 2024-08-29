import { Button } from "@/components";
import StaticField from "@/components/elements/StaticField";
import prompt from "@/components/modal/prompt";
import { Colors } from "@/constants";
import { Visit } from "@/models";
import Http from "@/utils/http";
import http from "@/utils/http";
import VisitUtils from "@/utils/visit";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";

interface OtherBabyCardProps {
  excludeVisitId: string;
  reload: object;
}

export const OtherBabyCard: React.FC<OtherBabyCardProps> = ({
  excludeVisitId,
  reload,
}) => {
  const dispatch = useDispatch();
  const [visits, setVisits] = useState<Visit[]>([]);
  const { t } = useTranslation("Visits");
  const fetchAllVisitOfTodo = () => {
    http.get("/api/visits/all/todo").then((res) => {
      setVisits(res);
    });
  };
  useEffect(() => {
    fetchAllVisitOfTodo();
  }, [reload]);

  const onCancelHomeVisit = (id: string) => {
    prompt(t("cancelVisitReason"), {
      onOk: async (value: string) => {
        await Http.delete(`/api/visits/${id}?deleteReason=${value}`).then(() =>
          setVisits(visits.filter((v) => v.id !== id)),
        );
      },
      dispatch,
    });
  };
  const realVisits = visits.filter((v) => v.id !== excludeVisitId);
  return realVisits && realVisits.length > 0 ? (
    <View style={styles.container}>
      <LinearGradient style={styles.titleBg} {...Colors.linearGradient}>
        <Text style={styles.title}>即将到来的家访</Text>
      </LinearGradient>
      <View style={styles.itemContainer}>
        <FlatList
          data={visits}
          keyExtractor={(visit) => visit.id + ""}
          renderItem={({ item: visit }) => {
            const { visitTime, baby } = visit as Visit;
            return (
              <View style={styles.item}>
                <View style={styles.itemHead}>
                  <Text style={styles.babyName}>{baby.name}</Text>
                  <Text style={styles.visitDate}>
                    {VisitUtils.formatDateTimeCN(visitTime)}
                  </Text>
                  <Button
                    title={t("cancelVisit")}
                    onPress={() => onCancelHomeVisit(visit.id)}
                  />
                </View>
                <StaticField label={t("area")}>{baby.area}</StaticField>
                <StaticField label={t("location")}>{baby.location}</StaticField>
              </View>
            );
          }}
        />
      </View>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  titleBg: {
    paddingTop: 12,
    paddingBottom: 28,
    paddingLeft: 28,
  },
  title: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  itemContainer: {
    paddingHorizontal: 28,
    marginTop: -18,
  },
  item: {
    marginBottom: 8,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 18,
    backgroundColor: "#fff",
  },
  itemHead: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  babyName: {
    fontSize: 12,
    fontWeight: "bold",
  },
  visitDate: {
    fontSize: 12,
    fontWeight: "bold",
  },
});
