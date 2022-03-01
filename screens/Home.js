import React, {useEffect, useState} from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import {LinearGradient} from 'expo-linear-gradient';
import {StyleSheet, ScrollView, RefreshControl, ToastAndroid, FlatList, View, Text, Alert} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import Http from '../utils/http';
import Visit from '../utils/visit';
import Storage from '../cache/storage';
import Resources from '../cache/resources';

import {lessonsUpdate} from '../actions';
import {Colors} from '../constants';
import {useBoolState} from '../utils';
import {styled} from '../utils/styled';
import {Message, Button, BottomRightBackground, LessonCard, BabyCard, StartLesson, Card} from '../components';
import StaticField from "../components/elements/StaticField";
import prompt from "../components/modal/prompt";
import  * as FileSystem from "expo-file-system"
import http from "../utils/http";

export default function Home({navigation}) {
    const [visit, reloadVisit] = Storage.useNextVisit();
    const {visitTime, baby, lesson, status} = visit;

    const [refreshing, startRefresh, endRefresh] = useBoolState();
    const [fetching, startFetch, endFetch] = useBoolState();
    const [submitErrorMessageVisible, openSubmitErrorMessage, closeSubmitErrorMessage] = useBoolState(false);
    const [reloadOtherVisit, setReloadOtherVisit] = useState({})

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
        } catch (e) {
        }
        try {
            await submit();
        } catch (e) {
        }
        try {
            Storage.setNextVisit(await Http.get('/api/visits/next')).then(() => setReloadOtherVisit({}));
        } catch (e) {
            Storage.setNextVisit({});
            // never going to get 404
            // if (e.status === 404) {}
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
            const answersData = await Storage.getAnswers(id)
            return Http.silencePut(`/api/visits/${id}/status`, {
                visitStatus: uncommitted[id].status,
                startTime: uncommitted[id].startTime,
                nextModuleIndex,
                questionnaireRecords: answersData?.answers
            }).then((_) => {
                Storage.setNextVisit({});
                Storage.committedVisitStatus();
                Storage.setAnswers(id, {});
                Storage.setNextModule(0);
            }).catch(_ => openSubmitErrorMessage());
        }
    }

    async function handleFetchUpdate() {
        startFetch();
        try {
            await Resources.fetchUpdateAsync();
            dispatch(lessonsUpdate({isAvailable: false}));
            ToastAndroid.show('下载最新课程资源完成！', ToastAndroid.SHORT);
        } catch (e) {
            ToastAndroid.show('下载最新课程资源失败！', ToastAndroid.SHORT);
        } finally {
            endFetch();
        }
    }

    async function cancelVisit(deleteReason) {
        await Http.delete(`/api/visits/${visit.id}?deleteReason=${deleteReason}`)
        setTimeout(() => {
            refresh(true)
        }, 1)
    }
    return (
        <StyledScrollView
            refreshControl={
                <RefreshControl colors={Colors.colors} refreshing={refreshing} onRefresh={refresh}/>
            }
        >
            <Spinner visible={fetching} textContent={'Loading...'} textStyle={{color: '#FFF'}}/>

            <Message
                info
                visible={submitErrorMessageVisible}
                title="等待同步"
                content="您有尚未同步的上课记录，恢复网络连接后将自动同步"
                buttonText="知道了"
                onButtonPress={closeSubmitErrorMessage}
            />

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
                    <BabyCard baby={baby}/>
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
                                visitTime: Visit.defaultVisitTime(new Date()),
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
                cancelVisit={cancelVisit}
            />
            {visit.id?<OtherBabyCard excludeVisitId={visit.id} reload={reloadOtherVisit}/>:null}
        </StyledScrollView>
    );
}

function OtherBabyCard({excludeVisitId, reload}) {
    const dispatch = useDispatch()
    const [visits, setVisits] = useState([])
    const fetchAllVisitOfTodo = () => {
        http.get("/api/visits/all/todo")
            .then(res => {
                setVisits(res)
            })
    }
    useEffect(() => {
        fetchAllVisitOfTodo()
    }, [reload])
    const onCancelHomeVisit = (id) => {
        prompt("取消家访原因", {
            onOk: async (v) => {
                await Http.delete(`/api/visits/${id}?deleteReason=${v}`)
                    .then(() => setVisits(visits.filter(v => v.id !== id)))
            }, dispatch
        })
    }
    const realVisits = visits.filter(v => v.id !== excludeVisitId)
    return (realVisits && realVisits.length > 0?
            <View style={otherStyle.container}>
                <LinearGradient style={otherStyle.titleBg} {...Colors.linearGradient}>
                    <Text style={otherStyle.title}>即将到来的家访</Text>
                </LinearGradient>
                <View style={otherStyle.itemContainer}>
                    <FlatList data={visits} keyExtractor={visit => visit.id + ""}
                              renderItem={({item : visit}) => {
                                  const {visitTime, baby} = visit;
                                  return (
                                      <View style={otherStyle.item}>
                                          <View style={otherStyle.itemHead}>
                                              <Text style={otherStyle.babyName}>{baby.name}</Text>
                                              <Text style={otherStyle.visitDate}>{Visit.formatDateTimeCN(visitTime)}</Text>
                                              <Button title="取消家访" onPress={() => onCancelHomeVisit(visit.id)}/>
                                          </View>
                                          <StaticField label="所在地区">{baby.area}</StaticField>
                                          <StaticField label="详细地址">{baby.location}</StaticField>
                                      </View>
                                  )
                              }}
                    />
                </View>
            </View> : null
    )
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

const otherStyle = StyleSheet.create({
    container: {
        marginTop: 20
    },
    titleBg: {
        paddingTop: 12,
        paddingBottom: 28,
        paddingLeft: 28
    },
    title: {
        fontSize: 20,
        color: "#fff",
        fontWeight: "bold"
    },
    itemContainer: {
        paddingHorizontal: 28,
        marginTop: -18
    },
    item: {
        marginBottom: 8,
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 18,
        backgroundColor: "#fff"
    },
    itemHead: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        alignContent: "center",
        alignItems: "center",
        marginBottom: 4
    },
    babyName: {
        fontSize: 12,
        fontWeight: "bold"
    },
    visitDate: {
        fontSize: 8
    }
})