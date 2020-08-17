import React from 'react';
import { ToastAndroid } from 'react-native';

import { useBoolState } from '../utils';

import Visit from '../utils/visit';
import Button from './elements/Button';
import Modal from './elements/Modal';
import LargeButtonContainer from './LargeButtonContainer';

export default function StartLesson({
  disabled,
  status,
  visitTime,
  navigation,
  lessonId,
  visitId,
  nextModuleIndex,
  from,
}) {
  const [startVisitVisible, openStartVisit, closeStartVisit] = useBoolState();

  function handleStart() {
    closeStartVisit();
    navigation.navigate('LessonIntro', { id: lessonId, visitId, preview: false, from });
  }

  function handleContinue() {
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
                if (!Visit.canBegin(status, visitTime)) {
                  ToastAndroid.show('时间未到，无法开始', ToastAndroid.SHORT);
                  return;
                }
                openStartVisit();
              }}
            />
          )}
        </LargeButtonContainer>
      )}

      <Modal
        title="您确定要立即开始本次家访吗？"
        visible={startVisitVisible}
        contentText={`本次拜访日程为：${Visit.formatDateTimeCN(visitTime)}`}
        okText="开始"
        cancelText="放弃"
        onCancel={closeStartVisit}
        onOk={handleStart}
      />
    </>
  );
}
