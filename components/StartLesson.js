import React, { useState } from 'react';

import { useBoolState } from '../utils';
import { ToastAndroid } from 'react-native';

import Visit from '../utils/visit';
import Button from './elements/Button';
import Modal from './elements/Modal';
import Message from './elements/Message';
import Input from './elements/Input';
import LargeButtonContainer from './LargeButtonContainer';
import { styled } from '../utils/styled';
import { useSelector } from 'react-redux';
import * as Location from 'expo-location';

export default function StartLesson({
  disabled,
  status,
  visitTime,
  navigation,
  lessonId,
  visitId,
  nextModuleIndex,
  from,
  validate,
  cancelVisit
}) {
  const [startVisitVisible, openStartVisit, closeStartVisit] = useBoolState();
  const [errorMessageVisble, openErrorMessage, closeErrorMessage] = useBoolState();
  const [deleteVisible, openDelete, closeDelete] = useBoolState();
  const { isConnected } = useSelector((state) => state.net);
  const [deleteremark, setDeleteRemark] = useState();
  const [errorMessageContent, setErrorMessageContent] = useState('时间未到，无法开始课堂');

  function handleStart() {
    closeStartVisit();
    navigation.navigate('LessonIntro', { id: lessonId, visitId, preview: false, from });
  }

  function handleContinue() {
    if (validate && !validate()) return;
    navigation.navigate('LessonIntro', {
      id: lessonId,
      visitId,
      preview: false,
      continue: true,
      nextModuleIndex,
      from,
    });
  }

  return (
    <>
      {visitId && (
        <LargeButtonContainer>
          {/* TODO Validate continue */}
          {Visit.statusUndone(status) && (
            <Button disabled={disabled} size="large" title="继续课堂" onPress={handleContinue} />
          )}

          {Visit.statusNotStart(status) && (
            <Button
              disabled={disabled || Visit.statusDone(status)}
              size="large"
              title="开始课堂"
              onPress={async () => {
                if (!Visit.canIStart(status, visitTime)) {
                  openErrorMessage();
                  setErrorMessageContent("时间未到，无法开始课堂")
                  return;
                }
                let { status } = await Location.requestPermissionsAsync();
                if (status !== 'granted') {
                  setErrorMessageContent("定位权限未打开，无法开始课堂")
                  openErrorMessage();
                  return;
                }
                if (validate && !validate()) return;
                openStartVisit();
              }}
            />
          )}
        </LargeButtonContainer>
      )}

      {visitId && isConnected && Visit.statusNotStart(status) && (
        <ButtonLine>
          <Button
            size="large"
            ghost
            type="primary"
            title="取消家访"
            onPress={() => {
              openDelete()
              setDeleteRemark('')
            }}
          />
        </ButtonLine>
      )}

      <Message
        error
        visible={errorMessageVisble}
        buttonText="知道了"
        onButtonPress={closeErrorMessage}
        title="无法开始课堂"
        content={errorMessageContent}
      />

      <Modal
        title="您确定要立即开始本次家访吗？"
        visible={startVisitVisible}
        contentText={`本次拜访日程为：${Visit.formatDateTimeCN(visitTime)}`}
        okText="开始"
        cancelText="放弃"
        onCancel={closeStartVisit}
        onOk={handleStart}
      />

      <Modal
        title="取消家访原因"
        visible={deleteVisible}
        content={<Input value={deleteremark} onChangeText={setDeleteRemark} border placeholder="请输入" />}
        okText="取消家访"
        cancelText="再想想"
        onCancel={closeDelete}
        onOk={() => {
          if (deleteremark) {
            cancelVisit(deleteremark)
            closeDelete()
          } else {
            ToastAndroid.show("请填写取消家访原因", ToastAndroid.LONG);
          }
        }}
      />
    </>
  );
}


const ButtonLine = styled.View`
  margin: 0 auto;
`;
