import { Button } from "@/components";
import StaticField from "@/components/elements/StaticField";
import prompt from "@/components/modal/prompt";
import { Colors } from "@/constants";
import { Visit } from "@/models";
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
  const [todoVisits, setTodoVisits] = useState<Visit[]>([]);
  const { t, i18n } = useTranslation("Visits");
  const fetchAllVisitOfTodo = () => {
    http.get("/api/visits/all/todo").then((res) => {
      setTodoVisits(res);
    });
  };
  const isZH = i18n.language === "zh";

  useEffect(() => {
    fetchAllVisitOfTodo();
  }, [reload]);

  const onCancelHomeVisit = (id: string) => {
    prompt(t("cancelVisitReason"), {
      onOk: async (value: string) => {
        await http
          .delete(`/api/visits/${id}?deleteReason=${value}`)
          .then(() => setTodoVisits(todoVisits.filter((v) => v.id !== id)));
      },
      dispatch,
    });
  };

  const showTodoVisits =
    todoVisits.filter((v) => v.id !== excludeVisitId).length > 0;

  return showTodoVisits ? (
    <View style={styles.container}>
      <LinearGradient style={styles.titleBg} {...Colors.linearGradient}>
        <Text style={styles.title}>{t("upComingVisit")}</Text>
      </LinearGradient>
      <View style={styles.itemContainer}>
        <FlatList
          data={todoVisits}
          keyExtractor={(visit) => visit.id + ""}
          renderItem={({ item: visit }: { item: Visit }) => {
            const { visitTime, baby } = visit;
            return (
              <View style={styles.item}>
                <View style={styles.itemHead}>
                  <Text style={styles.babyName}>{baby.name}</Text>
                  <Text style={styles.visitDate}>
                    {isZH
                      ? VisitUtils.formatDateTimeCN(visitTime)
                      : VisitUtils.formatDateTimeEN(visitTime)}
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
