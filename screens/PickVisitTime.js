import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { CalendarList } from 'react-native-calendars';

import Http from '../utils/http';
import { Colors } from '../constants';
import { styled, px2dp } from '../utils/styled';
import { StaticField, StaticForm, LargeButtonContainer, Button } from '../components';

export default function PickVisitTime({ navigation }) {
  const [now] = useState(moment());
  const [markedDates, setMarkedDates] = useState();
  const [selected, setSelected] = useState(moment().format('YYYY-MM-DD'));

  function handleSubmit() {
    navigation.navigate('CreateVisit', { visitTime: `${selected}T10:00` });
  }

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

  return (
    <Container>
      <CardField>
        <StaticForm>
          <StaticField label="选择家访日期" labelWidth={60}>
            {moment(selected).format('YYYY年MM月DD日')}
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
            [selected]: {
              selected: true,
              marked: markedDates && !!markedDates[selected],
              dotColor: '#fff',
            },
          }}
          onDayPress={(day) => {
            setSelected(day.dateString);
          }}
        />
      </CalendarContainer>

      <CardField>
        <StaticForm>
          <StaticField label="选择家访时间" labelWidth={60}>
            上午10:00
          </StaticField>
        </StaticForm>
      </CardField>

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
