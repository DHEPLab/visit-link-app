import React from 'react';

import { useBoolState } from '../utils';

import Visit from '../utils/visit';
import Button from './elements/Button';
import Modal from './elements/Modal';
import Message from './elements/Message';
import LargeButtonContainer from './LargeButtonContainer';
import { styled } from '../utils/styled';
import { useSelector } from 'react-redux';

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
              onPress={() => {
                if (!Visit.canIStart(status, visitTime)) {
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
            disabled={disabled || Visit.statusDone(status)}
            size="large"
            ghost
            type="primary"
            title="取消家访"
            onPress={openDelete}
          />
        </ButtonLine>
      )}

      <Message
        error
        visible={errorMessageVisble}
        buttonText="知道了"
        onButtonPress={closeErrorMessage}
        title="无法开始课堂"
        content="时间未到，无法开始课堂"
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
        title="删除家访"
        visible={deleteVisible}
        contentText="确认要删除此条家访？"
        okText="删除"
        cancelText="取消"
        onCancel={closeDelete}
        onOk={() => {
          cancelVisit()
          closeDelete()
        }}
      />
    </>
  );
}


const ButtonLine = styled.View`
  margin: 0 auto;
`;
