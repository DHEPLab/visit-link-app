import React, { useState } from 'react';
import moment from 'moment';
import { CalendarList } from 'react-native-calendars';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { Colors } from '../constants';
import { styled, px2dp } from '../utils/styled';
import { Button } from '../components';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Visits() {
  const [now] = useState(moment());
  const { navigate } = useNavigation();
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <>
      <Header {...Colors.linearGradient}>
        <Title>家访日程安排</Title>
        <Date>{now.format('YYYY年MM月DD日')}</Date>
      </Header>
      {showCalendar && (
        <CalendarContainer>
          <CalendarList
            // Enable horizontal scrolling, default = false
            horizontal={true}
            // Enable paging on horizontal, default = false
            pagingEnabled={true}
            hideArrows={false}
            markedDates={{
              '2020-07-17': { marked: true },
            }}
            // Set custom calendarWidth.
            calendarWidth={px2dp(400)}
            monthFormat={'yyyy年 M月'}
            current={now.format('YYYY-MM-DD')}
          />
        </CalendarContainer>
      )}
      <TouchableOpacity onPress={() => setShowCalendar(!showCalendar)} activeOpacity={0.8}>
        <ExtendCalendar>
          <ExtendLabel>
            <FontAwesome5 name="calendar-alt" size={px2dp(14)} color="#ff794f" />
            <ExtendLabelText>{showCalendar ? '收起日历' : '展开日历'}</ExtendLabelText>
          </ExtendLabel>
          <MaterialIcons
            name={showCalendar ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
            size={px2dp(16)}
            color="#FF794F"
          />
        </ExtendCalendar>
      </TouchableOpacity>
      <ButtonContainer>
        <Button title="新建家访" onPress={() => navigate('CreateVisit')} />
      </ButtonContainer>
    </>
  );
}

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

const Date = styled.Text`
  color: #fff;
  font-size: 12px;
  align-self: center;
  margin-top: 8px;
  font-weight: bold;
`;
