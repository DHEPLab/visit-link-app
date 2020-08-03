import React, { useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, RefreshControl, ToastAndroid } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import Visit from '../utils/visit';
import { styled } from '../utils/styled';
import { Colors } from '../constants';
import {
  Button,
  Card,
  StaticForm,
  StaticField,
  BabyLine,
  BottomRightBackground,
} from '../components';

import storage from '../cache/storage';
import sync from '../cache/sync';
import http from '../utils/http';
import { useBoolState } from '../utils';

export default function Home({ navigation }) {
  const [visit, reloadVisit] = storage.useNextVisit();
  const [visitStatus, reloadVisitStatus] = storage.useVisitStatus();
  const { visitTime, baby, lesson, status } = visit;

  const [refreshing, startRefresh, endRefresh] = useBoolState();
  const [inTheSynchronous, startSynchronous, endSynchronous] = useBoolState();

  const finished = visitStatus === 'DONE';

  useEffect(() => navigation.addListener('focus', () => refresh()), [navigation]);

  async function refresh() {
    startRefresh();
    try {
      await submit();
      const data = await http.get('/api/visits/next');
      storage.setNextVisit(data);
    } catch (error) {
      if (error.status === 404) {
        storage.setNextVisit({});
      }
    } finally {
      reloadVisit();
      reloadVisitStatus();
      endRefresh();
    }
  }

  async function submit() {
    const _visitStatus = await storage.getVisitStatus();
    if (_visitStatus) {
      const nextModuleIndex = await storage.getNextModule();
      const { id } = await storage.getNextVisit();
      if (id) {
        return http
          .put(`/api/visits/${id}/status`, {
            visitStatus: _visitStatus,
            nextModuleIndex,
          })
          .then((_) => {
            storage.setNextVisit({});
            storage.setVisitStatus('');
            storage.setNextModule(0);
          });
      }
    }
  }

  async function handleSynchronous() {
    startSynchronous();
    try {
      await sync();
      ToastAndroid.show('下载最新课程资源完成！', ToastAndroid.SHORT);
    } finally {
      endSynchronous();
    }
  }

  function startVisit(preview = false) {
    navigation.navigate('LessonIntro', { id: visit.lesson?.id, preview });
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
            <>
              您尚未创建任何家访：{'\n'}
              快来创建家访吧！
            </>
          )}
        </Title>
        <SyncButton>
          <Button onPress={handleSynchronous} ghost size="small" title="一键下载" />
        </SyncButton>
      </Header>

      {visit.id ? (
        <CardContainer>
          <Card title="家访对象" background={require('../assets/images/baby-bg.png')}>
            <BabyLineContainer>
              <BabyLine {...baby} />
            </BabyLineContainer>
            <StaticForm>
              <StaticField label="主照料人">{baby?.carerName}</StaticField>
              <StaticField label="联系电话">{baby?.carerPhone}</StaticField>
              <StaticField label="所在区域">{baby?.area}</StaticField>
              <StaticField label="详细地址">{baby?.location}</StaticField>
            </StaticForm>
          </Card>
          <Card
            title="课堂安排"
            right={!finished && <Button title="预览" onPress={() => startVisit(true)} />}
          >
            <LessonName>{lesson?.name}</LessonName>
            <StaticForm>
              {lesson?.moduleNames?.map((name, index) => (
                <StaticField key={name} label={`模块 ${index + 1}`}>
                  {name}
                </StaticField>
              ))}
            </StaticForm>
          </Card>
        </CardContainer>
      ) : (
        <NoDataContainer>
          <Button title="新建家访" size="large" />
        </NoDataContainer>
      )}

      {Visit.canBegin(status, visitTime) && (
        <ButtonContainer>
          <Button size="large" title="开始课堂" disabled={finished} onPress={startVisit} />
        </ButtonContainer>
      )}
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

const BabyLineContainer = styled.View`
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
