import React, { useState } from 'react';
import moment from 'moment';
import { CalendarList } from 'react-native-calendars';
import { LinearGradient } from 'expo-linear-gradient';

import { Colors } from '../constants';
import { styled, px2dp } from '../utils/styled';
import { Button } from '../components';
import { useNavigation } from '@react-navigation/native';

export default function Visit() {
  const [now] = useState(moment());
  const { navigate } = useNavigation();

  return (
    <>
      <Header {...Colors.linearGradient}>
        <Title>家访日程安排</Title>
        <Date>{now.format('YYYY年MM月DD日')}</Date>
      </Header>
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
      <ButtonContainer>
        <Button title="新建家访" onPress={() => navigate('CreateVisit')} />
      </ButtonContainer>
    </>
  );
}

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
