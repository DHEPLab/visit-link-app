import React, { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, RefreshControl, ToastAndroid } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import Visit from '../utils/visit';
import { styled } from '../utils/styled';
import { Colors } from '../constants';
import { Button, BottomRightBackground, LessonCard, BabyCard, StartLesson } from '../components';

import storage from '../cache/storage';
import sync from '../cache/sync';
import http from '../utils/http';
import { useBoolState } from '../utils';

export default function Home({ navigation }) {
  const [visit, reloadVisit] = storage.useNextVisit();
  const { visitTime, baby, lesson, status } = visit;

  const [refreshing, startRefresh, endRefresh] = useBoolState();
  const [inTheSynchronous, startSynchronous, endSynchronous] = useBoolState();

  const [downloadResource, setDownloadResource] = useState();

  useEffect(() => navigation.addListener('focus', () => refresh()), [navigation]);

  async function refresh() {
    startRefresh();
    try {
      await submit();
      const data = await http.get('/api/visits/next');
      storage.setNextVisit(data);
      checkResourceUpdate();
    } catch (error) {
      if (error.status === 404) {
        storage.setNextVisit({});
      }
    } finally {
      reloadVisit();
      endRefresh();
    }
  }

  function checkResourceUpdate() {
    storage.getLastUpdateAt().then((lastUpdateAt) => {
      if (!lastUpdateAt) return setDownloadResource('一键下载');
      http
        .get('/api/resources/check-for-updates', {
          lastUpdateAt: lastUpdateAt || '',
        })
        .then(({ updated }) => {
          setDownloadResource(updated ? '一键更新' : null);
        });
    });
  }

  async function submit() {
    const _visitStatus = await storage.getVisitStatus();
    const nextModuleIndex = await storage.getNextModule();
    const id = Object.keys(_visitStatus || {})[0];
    if (id) {
      return http
        .put(`/api/visits/${id}/status`, {
          visitStatus: _visitStatus[id],
          nextModuleIndex,
        })
        .then((_) => {
          storage.setNextVisit({});
          storage.cleanVisitStatus();
          storage.setNextModule(0);
        });
    }
  }

  async function handleSynchronous() {
    startSynchronous();
    try {
      await sync();
      setDownloadResource();
      ToastAndroid.show('下载最新课程资源完成！', ToastAndroid.SHORT);
    } finally {
      endSynchronous();
    }
  }

  return (
    <StyledScrollView
      refreshControl={
        <RefreshControl colors={Colors.colors} refreshing={refreshing} onRefresh={refresh} />
      }
    >
      <Spinner
        visible={inTheSynchronous}
        textContent={'Loading...'}
        textStyle={{ color: '#FFF' }}
      />
      <Header {...Colors.linearGradient}>
        <BottomRightBackground
          width={140}
          height={134}
          source={require('../assets/images/curriculum-bg.png')}
        />
        <Title>
          {visit.id ? (
            <>
              您的下一次家访：{'\n'}
              {Visit.formatDateTimeCN(visitTime)}
            </>
          ) : (
            <>您没有家访安排，{'\n'}请创建新的家访：</>
          )}
        </Title>
        {downloadResource && (
          <SyncButton>
            <Button onPress={handleSynchronous} ghost size="small" title={downloadResource} />
          </SyncButton>
        )}
      </Header>

      {visit.id ? (
        <CardContainer>
          <BabyCard baby={baby} />
          <LessonCard lesson={lesson} status={status} navigation={navigation} />
        </CardContainer>
      ) : (
        <NoDataContainer>
          <Button
            title="新建家访"
            disabled={downloadResource}
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
        {...{ status, visitTime, navigation, visitId: visit.id, lessonId: visit?.lesson?.id }}
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

const MiniBabyContainer = styled.View`
  padding-bottom: 8px;
`;

const LessonName = styled.Text`
  color: #525252;
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const StyledScrollView = styled(ScrollView)`
  flex: 1;
`;

const CardContainer = styled.View`
  margin: 0 28px;
  margin-top: -34px;
`;

const ButtonContainer = styled.View`
  margin-top: 20px;
  margin-bottom: 10px;
`;
