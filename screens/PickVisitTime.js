import React, { useState } from 'react';
import moment from 'moment';
import { CalendarList } from 'react-native-calendars';
import NetInfo from '@react-native-community/netinfo';
import DateTimePicker from '@react-native-community/datetimepicker';

import Http from '../utils/http'
import Visit from '../utils/visit';
import { Colors } from '../constants';
import { styled, px2dp } from '../utils/styled';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useFetchArray, useBoolState, calenderMarkedDates } from '../utils';
import { StaticField, StaticForm, LargeButtonContainer, Button, Modal } from '../components';

export default function PickVisitTime({ navigation, route }) {
  const { params } = route;
  const { range, visitTime } = params;
  const from = params.from || 'CreateVisit';
  const [now] = useState(moment());
  const [markedDates] = useFetchArray('/api/visits/marked-dates');

  const [mode, setMode] = useState('time');
  const [timePicker, showTimePicker, hideTimePicker] = useBoolState();
  const [conflictVisible, openConflict, closeConflict] = useBoolState();
  const [connect, isConnect, isNotConnect] = useBoolState();

  const defaultDatetime = Visit.defaultDatetime(range, visitTime);
  const [date, setDate] = useState(Visit.formatDate(defaultDatetime));
  const [time, setTime] = useState(moment(defaultDatetime).toDate());

  useEffect(
    () =>
      navigation.addListener('focus', () => {
        refreshConnect();
      }),
    [navigation]
  );

  async function handleSubmit() {
    if (connect) {
      const data = await Http.get('/api/visits', { date });
      const visitTime = Visit.mergeDateAndTime(date, time);
      const conflict = data.filter(visit => Visit.statusNotStart(visit.status))
                          .map(visit => Visit.visitTimeMayConflict(visit.visitTime, visitTime))
                          .reduce((previous, current) => previous || current, false);
      if (conflict) {
        return openConflict();
      }
    }
    submit();
  }

  function submit() {
    closeConflict();
    const visitTime = Visit.mergeDateAndTime(date, time);
    navigation.navigate(from, { visitTime });
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

  function refreshConnect () {
    NetInfo.fetch().then(({ isConnected }) => {
      if (!isConnected) {
        isNotConnect()
        loadOfflineVisit();
      } else {
        isConnect()
      }
    })
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

      <Modal
        title="家访时间冲突"
        visible={conflictVisible}
        contentText="您所选的时间段有邻近的家访安排，可能会时间冲突，确定选择该时间吗？"
        okText="确定"
        cancelText="取消"
        onCancel={closeConflict}
        onOk={submit}
      />

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
