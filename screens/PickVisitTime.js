import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { CalendarList } from 'react-native-calendars';
import DateTimePicker from '@react-native-community/datetimepicker';

import Visit from '../utils/visit';
import http from '../utils/http';
import { Colors } from '../constants';
import { styled, px2dp } from '../utils/styled';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useFetchArray, useBoolState, calenderMarkedDates } from '../utils';
import { StaticField, StaticForm, LargeButtonContainer, Button } from '../components';

export default function PickVisitTime({ navigation, route }) {
  const [now] = useState(moment());
  const [markedDates] = useFetchArray('/api/visits/marked-dates');

  const [mode, setMode] = useState('time');
  const [timePicker, showTimePicker, hideTimePicker] = useBoolState();

  const defaultDatetime = route.params?.visitTime ? moment(route.params.visitTime) : moment();
  const [date, setDate] = useState(Visit.formatDate(defaultDatetime));
  const [time, setTime] = useState(defaultDatetime.toDate());
  const [range, setRange] = useState([Visit.formatDate(moment()), null]);

  useEffect(() => {
    if (!route.params?.babyId) return;
    http.get(`/api/babies/${route.params.babyId}/visit-date-range`).then(setRange);
  }, [route.params?.babyId]);

  function handleSubmit() {
    navigation.navigate('CreateVisit', {
      visitTime: Visit.mergeDateAndTime(date, time),
    });
  }

  function onPressTime() {
    showTimePicker();
    // set mode value to trigger render
    setMode('time');
  }

  function onChangeTime({ nativeEvent }) {
    hideTimePicker();
    if (nativeEvent.timestamp) {
      setTime(new Date(nativeEvent.timestamp));
    }
  }

  return (
    <Container>
      <CardField>
        <StaticForm>
          <StaticField label="选择家访日期" labelWidth={60}>
            {Visit.formatDateCN(date)}
          </StaticField>
        </StaticForm>
      </CardField>

      <CalendarContainer>
        <CalendarList
          horizontal={true}
          pagingEnabled={true}
          hideArrows={false}
          calendarWidth={px2dp(344)}
          monthFormat={'yyyy年 M月'}
          current={Visit.formatDate(now)}
          minDate={range[0]}
          maxDate={range[1]}
          theme={Colors.calendar}
          onDayPress={(day) => setDate(day.dateString)}
          markedDates={{
            ...calenderMarkedDates(markedDates),
            [date]: {
              selected: true,
              dotColor: '#fff',
              marked: markedDates?.includes(date),
            },
          }}
        />
      </CalendarContainer>

      <TouchableOpacity onPress={onPressTime} activeOpacity={0.8}>
        <CardField>
          <StaticForm>
            <StaticField label="选择家访时间" labelWidth={60}>
              {Visit.formatTimeCN(time)}
            </StaticField>
          </StaticForm>
        </CardField>
      </TouchableOpacity>

      {timePicker && (
        <DateTimePicker
          mode={mode}
          value={time}
          is24Hour={false}
          display="default"
          onChange={onChangeTime}
        />
      )}

      <LargeButtonContainer>
        <Button size="large" title="提交" onPress={handleSubmit} />
      </LargeButtonContainer>
    </Container>
  );
}

const Container = styled.View`
  padding: 20px 28px;
`;

const CardField = styled.View`
  margin-bottom: 12px;
  background: #fff;
  border-radius: 8px;
  padding: 12px;
`;

const CalendarContainer = styled.View`
  border-radius: 8px;
  margin-bottom: 12px;
`;
