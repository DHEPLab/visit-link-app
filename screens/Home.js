import React, { useEffect } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, RefreshControl, ToastAndroid } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Http from '../utils/http';
import Visit from '../utils/visit';
import Storage from '../cache/storage';
import Resources from '../cache/resources';

import { lessonsUpdate } from '../actions';
import { Colors } from '../constants';
import { useBoolState } from '../utils';
import { styled } from '../utils/styled';
import { Button, BottomRightBackground, LessonCard, BabyCard, StartLesson } from '../components';

export default function Home({ navigation }) {
  const [visit, reloadVisit] = Storage.useNextVisit();
  const { visitTime, baby, lesson, status } = visit;

  const [refreshing, startRefresh, endRefresh] = useBoolState();
  const [fetching, startFetch, endFetch] = useBoolState();

  const dispatch = useDispatch();
  // lesson resources update state
  const update = useSelector((state) => state.lessonsUpdate);

  // refresh silent mode when focus navigation
  useEffect(() => navigation.addListener('focus', () => refresh(true)), [navigation]);

  // silent mode prevents flickering when loading too fast
  async function refresh(silent = false) {
    !silent && startRefresh();
    try {
      dispatch(lessonsUpdate(await Resources.checkForUpdateAsync()));
    } catch (e) {}
    try {
      await submit();
    } catch (e) {}
    try {
      Storage.setNextVisit(await Http.get('/api/visits/next'));
    } catch (e) {
      if (e.status === 404) {
        Storage.setNextVisit({});
      }
    }
    reloadVisit();
    !silent && endRefresh();
  }

  // submit home visit data starting with offline mode
  async function submit() {
    const uncommitted = await Storage.getUncommittedVisitStatus();
    const nextModuleIndex = await Storage.getNextModule();
    const id = Object.keys(uncommitted || {})[0];
    if (id) {
      return Http.put(`/api/visits/${id}/status`, {
        visitStatus: uncommitted[id].status,
        startTime: uncommitted[id].startTime,
        nextModuleIndex,
      }).then((_) => {
        Storage.setNextVisit({});
        Storage.committedVisitStatus();
        Storage.setNextModule(0);
      });
    }
  }

  async function handleFetchUpdate() {
    startFetch();
    try {
      await Resources.fetchUpdateAsync();
      dispatch(lessonsUpdate({ isAvailable: false }));
      ToastAndroid.show('下载最新课程资源完成！', ToastAndroid.SHORT);
    } catch (e) {
      ToastAndroid.show('下载最新课程资源失败！', ToastAndroid.SHORT);
    } finally {
      endFetch();
    }
  }

  return (
    <StyledScrollView
      refreshControl={
        <RefreshControl colors={Colors.colors} refreshing={refreshing} onRefresh={refresh} />
      }
    >
      <Spinner visible={fetching} textContent={'Loading...'} textStyle={{ color: '#FFF' }} />

      <Header {...Colors.linearGradient}>
        <BottomRightBackground
          width={140}
          height={134}
          source={require('../assets/images/curriculum-bg.png')}
        />

        <Title>
          {visit.id
            ? `您的下一次家访：\n${Visit.formatDateTimeCN(visitTime)}`
            : `您没有家访安排，\n请创建新的家访：`}
        </Title>

        {update.isAvailable && (
          <SyncButton>
            <Button
              ghost
              size="small"
              onPress={handleFetchUpdate}
              title={update.firstTime ? '一键下载' : '一键更新'}
            />
          </SyncButton>
        )}
      </Header>

      {visit.id ? (
        <CardContainer>
          <BabyCard baby={baby} />
          <LessonCard
            disabled={update.isAvailable}
            lesson={lesson}
            status={status}
            navigation={navigation}
          />
        </CardContainer>
      ) : (
        <NoDataContainer>
          <Button
            title="新建家访"
            disabled={update.isAvailable}
            size="large"
            onPress={() =>
              navigation.navigate('CreateVisit', {
                visitTime: `${Visit.formatDate(new Date())}T10:00`,
              })
            }
          />
        </NoDataContainer>
      )}

      <StartLesson
        {...{
          disabled: update.isAvailable,
          status,
          visitTime,
          navigation,
          visitId: visit.id,
          lessonId: visit?.lesson?.id,
          from: 'Home',
        }}
      />
    </StyledScrollView>
  );
}

const SyncButton = styled.View`
  position: absolute;
  right: 20px;
  top: 30px;
`;

const Header = styled(LinearGradient)`
  position: relative;
  width: 100%;
  height: 160px;
  padding-top: 50px;
  padding-left: 28px;
`;

const Title = styled.Text`
  font-size: 20px;
  color: #fff;
  font-weight: bold;
`;

const NoDataContainer = styled.View`
  height: 100px;
  justify-content: center;
`;

const StyledScrollView = styled(ScrollView)`
  flex: 1;
`;

const CardContainer = styled.View`
  margin: 0 28px;
  margin-top: -34px;
`;
