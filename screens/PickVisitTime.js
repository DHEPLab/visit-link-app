import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { CalendarList } from 'react-native-calendars';
import DateTimePicker from '@react-native-community/datetimepicker';

import Http from '../utils/http';
import { useBoolState } from '../utils';
import { Colors } from '../constants';
import { styled, px2dp } from '../utils/styled';
import { StaticField, StaticForm, LargeButtonContainer, Button } from '../components';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function PickVisitTime({ navigation }) {
  const [now] = useState(moment());
  const [markedDates, setMarkedDates] = useState();

  const [mode, setMode] = useState('time');
  const [timePicker, showTimePicker, hideTimePicker] = useBoolState();

  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    Http.get('/api/visits/marked-dates').then((data) => {
      const _markedDates = {};
      data.forEach((datum) => {
        _markedDates[datum] = {
          marked: true,
        };
      });
      setMarkedDates(_markedDates);
    });
  }, []);

  function handleSubmit() {
    navigation.navigate('CreateVisit', {
      visitTime: `${date}T${moment(time).format('HH:mm')}`,
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
            {moment(date).format('YYYY年MM月DD日')}
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
          current={now.format('YYYY-MM-DD')}
          theme={Colors.calendar}
          markedDates={{
            ...markedDates,
            [date]: {
              selected: true,
              marked: markedDates && !!markedDates[date],
              dotColor: '#fff',
            },
          }}
          onDayPress={(day) => {
            setDate(day.dateString);
          }}
        />
      </CalendarContainer>

      <TouchableOpacity onPress={onPressTime} activeOpacity={0.8}>
        <CardField>
          <StaticForm>
            <StaticField label="选择家访时间" labelWidth={60}>
              {moment(time).format('HH:mm')}
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
