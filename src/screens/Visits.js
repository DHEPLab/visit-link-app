import React, { useState, useEffect } from "react";
import moment from "moment";
import { FlatList, ToastAndroid } from "react-native";
import { CalendarList } from "react-native-calendars";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { useSelector } from "react-redux";

import Visit from "../utils/visit";
import Http from "../utils/http";
import { useManualFetchArray, calenderMarkedDates } from "../utils";
import { Colors } from "../constants";
import { styled, px2dp } from "../utils/styled";
import { Button, VisitItem, NoData } from "../components";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTranslation } from "react-i18next";

export default function Visits({ navigation }) {
  const [now] = useState(moment());

  const [visits, setVisits] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selected, setSelected] = useState(Visit.formatDate(moment()));
  const [markedDates, refreshMarkedDates] = useManualFetchArray(
    "/api/visits/marked-dates",
  );
  const { isConnected } = useSelector((state) => state.net);
  const { t, i18n } = useTranslation();

  const isZH = i18n.language === "zh";

  useEffect(
    () => navigation.addListener("focus", () => refreshMarkedDates()),
    [navigation],
  );

  useEffect(() => {
    if (markedDates && !markedDates.includes(selected)) return setVisits([]);
    Http.get("/api/visits", {
      date: selected,
    }).then(setVisits);
  }, [selected, markedDates]);

  function handlePressVisit(item) {
    if (!item.babyApproved && item.status === "NOT_STARTED") {
      ToastAndroid.show(t("Baby:waitForApproval"), ToastAndroid.SHORT);
      return;
    }
    navigation.navigate("Visit", { id: item.id });
  }

  return (
    <>
      <Header {...Colors.linearGradient}>
        <Title>{t("Visits:visitArrangement")}</Title>
        <VisitDate>
          {isZH ? Visit.formatDateCN(selected) : Visit.formatDateEN(selected)}
        </VisitDate>
      </Header>

      {showCalendar && (
        <CalendarContainer>
          <CalendarList
            horizontal={true}
            pagingEnabled={true}
            hideArrows={false}
            calendarWidth={px2dp(400)}
            monthFormat={isZH ? "yyyy年 M月" : "MMMM yyyy"}
            current={Visit.formatDate(now)}
            theme={Colors.calendar}
            markedDates={{
              ...calenderMarkedDates(markedDates),
              [selected]: {
                selected: true,
                dotColor: "#fff",
                marked: markedDates?.includes(selected),
              },
            }}
            onDayPress={(day) => setSelected(day.dateString)}
          />
        </CalendarContainer>
      )}

      <TouchableOpacity
        onPress={() => setShowCalendar(!showCalendar)}
        activeOpacity={0.8}
      >
        <ExtendCalendar>
          <ExtendLabel>
            <FontAwesome5
              name="calendar-alt"
              size={px2dp(14)}
              color="#ff794f"
            />
            <ExtendLabelText>
              {showCalendar
                ? t("Visits:foldCalender")
                : t("Visits:unfoldCalender")}
            </ExtendLabelText>
          </ExtendLabel>
          <MaterialIcons
            name={showCalendar ? "keyboard-arrow-up" : "keyboard-arrow-down"}
            size={px2dp(16)}
            color="#FF794F"
          />
        </ExtendCalendar>
      </TouchableOpacity>

      <ButtonContainer>
        <Button
          title={t("Visits:scheduleVisit")}
          disabled={!isConnected || Visit.disabledVisitButton(now, selected)}
          onPress={() =>
            navigation.navigate("CreateVisit", {
              visitTime: Visit.defaultVisitTime(new Date(), selected),
            })
          }
        />
      </ButtonContainer>

      <StyledFlatList
        ListEmptyComponent={<NoData title={t("Visits:noVisitSchedule")} />}
        data={visits}
        keyExtractor={(item) => item.id + ""}
        renderItem={({ item }) => (
          <VisitItem onPress={() => handlePressVisit(item)} value={item} />
        )}
      />
    </>
  );
}

const StyledFlatList = styled(FlatList)`
  padding: 0 28px;
`;

const CalendarContainer = styled.View`
  border-bottom-width: 1px;
  border-color: #ffc3a0;
`;

const ExtendLabel = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ExtendLabelText = styled.Text`
  color: #ff794f;
  font-size: 10px;
  font-weight: bold;
  margin-left: 8px;
`;

const ExtendCalendar = styled.View`
  height: 34px;
  background: #fff;
  flex-direction: row;
  padding: 0 28px;
  align-items: center;
  justify-content: space-between;
`;

const ButtonContainer = styled.View`
  margin: 20px 0;
  flex-direction: row;
  justify-content: center;
`;

const Header = styled(LinearGradient)`
  height: 84px;
  width: 100%;
`;

const Title = styled.Text`
  color: #fff;
  font-size: 12px;
  align-self: center;
  margin-top: 28px;
  font-weight: bold;
`;

const VisitDate = styled.Text`
  color: #fff;
  font-size: 12px;
  align-self: center;
  margin-top: 8px;
  font-weight: bold;
`;
