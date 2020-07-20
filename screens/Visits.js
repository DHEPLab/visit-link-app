import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { FlatList, RefreshControl } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

import Http from '../utils/http';
import { Colors } from '../constants';
import { styled, px2dp } from '../utils/styled';
import { Button, VisitCard, NoData } from '../components';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Visits() {
  const [now] = useState(moment());
  const { navigate } = useNavigation();
  const [markedDates, setMarkedDates] = useState();
  const [showCalendar, setShowCalendar] = useState(false);
  const [selected, setSelected] = useState(moment().format('YYYY-MM-DD'));
  const [visits, setVisits] = useState([]);

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

  useEffect(() => {
    if (markedDates && !markedDates[selected]) return setVisits([]);
    Http.get('/api/visits', {
      date: selected,
    }).then(setVisits);
  }, [selected]);

  return (
    <>
      <Header {...Colors.linearGradient}>
        <Title>家访日程安排</Title>
        <VisitDate>{moment(selected).format('YYYY年MM月DD日')}</VisitDate>
      </Header>

      {showCalendar && (
        <CalendarContainer>
          <CalendarList
            horizontal={true}
            pagingEnabled={true}
            hideArrows={false}
            calendarWidth={px2dp(400)}
            monthFormat={'yyyy年 M月'}
            current={now.format('YYYY-MM-DD')}
            theme={Colors.calendar}
            markedDates={{
              ...markedDates,
              [selected]: { selected: true, marked: !!markedDates[selected], dotColor: '#fff' },
            }}
            onDayPress={(day) => {
              setSelected(day.dateString);
            }}
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

      {visits.length > 0 ? (
        <StyledFlatList
          refreshControl={<RefreshControl colors={Colors.colors} />}
          data={visits}
          keyExtractor={(item) => item.id + ''}
          renderItem={({ item }) => <VisitCard onPress={() => navigate('Visit')} value={item} />}
        />
      ) : (
        <NoData title="该日期暂时没有家访安排" />
      )}
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
