import React, { useState } from "react";
import moment from "moment";
import { TouchableOpacity } from "react-native-gesture-handler";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useTranslation } from "react-i18next";

import { styled } from "../../utils/styled";
import { useBoolState } from "../../utils";

export default function DatePicker({ value, onChange, ...props }) {
  const { t, i18n } = useTranslation("DatePicker");
  const [mode, setMode] = useState("date");
  const [visible, show, hide] = useBoolState();

  function onPressTime() {
    show();
    // set mode value to trigger render
    setMode("date");
  }

  function onChangeTime({ nativeEvent }) {
    hide();
    if (nativeEvent.timestamp) {
      const date = moment(nativeEvent.timestamp);
      onChange(
        date.format(i18n.language === "zh" ? "YYYY年MM月DD日" : "YYYY-MM-DD"),
      );
    }
  }

  function formatDate(date) {
    return moment(date).format(
      i18n.language === "zh" ? "YYYY年MM月DD日" : "YYYY-MM-DD",
    );
  }

  return (
    <Container>
      <TouchableOpacity onPress={onPressTime} activeOpacity={0.8}>
        {value ? (
          <Value>{formatDate(value)}</Value>
        ) : (
          <Placeholder>{t("selectDate")}</Placeholder>
        )}
      </TouchableOpacity>
      {visible && (
        <DateTimePicker
          {...props}
          mode={mode}
          value={(value && new Date(moment(value))) || new Date()}
          display="default"
          onChange={onChangeTime}
          locale={i18n.language}
        />
      )}
    </Container>
  );
}

const Container = styled.View``;
const Placeholder = styled.Text`
  color: #ff794f;
  font-size: 10px;
  line-height: 16px;
`;

const Value = styled.Text`
  font-size: 10px;
  line-height: 16px;
`;
