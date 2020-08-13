import React from 'react';

import { useBoolState } from '../utils';

import Visit from '../utils/visit';
import Button from './elements/Button';
import Modal from './elements/Modal';
import LargeButtonContainer from './LargeButtonContainer';

export default function StartLesson({ status, visitTime, navigation, lessonId, visitId }) {
  const downloadResource = '';
  const [startVisitVisible, openStartVisit, closeStartVisit] = useBoolState();

  function handleStart() {
    navigation.navigate('LessonIntro', { id: lessonId, visitId, preview: false });
  }

  return (
    <>
      {visitId && (
        <LargeButtonContainer>
          <Button
            disabled={downloadResource || Visit.statusDone(status)}
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
