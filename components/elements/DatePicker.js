import React, { useState } from 'react';
import moment from 'moment';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';

import { styled } from '../../utils/styled';
import { useBoolState } from '../../utils';

export default function DatePicker({ value, onChange }) {
  const [mode, setMode] = useState('date');
  const [visible, show, hide] = useBoolState();

  function onPressTime() {
    show();
    // set mode value to trigger render
    setMode('date');
  }

  function onChangeTime({ nativeEvent }) {
    hide();
    if (nativeEvent.timestamp) {
      onChange(moment(nativeEvent.timestamp).format('YYYY-MM-DD'));
    }
  }

  return (
    <Container>
      <TouchableOpacity onPress={onPressTime} activeOpacity={0.8}>
        {value ? <Value>{value}</Value> : <Placeholder>请选择年/月/日</Placeholder>}
      </TouchableOpacity>
      {visible && (
        <DateTimePicker
          mode={mode}
          value={(value && new Date(moment(value))) || new Date()}
          display="default"
          onChange={onChangeTime}
        />
      )}
    </Container>
  );
}

const Container = styled.View``;
const Placeholder = styled.Text`
  color: #ff794f;
  font-size: 10px;
  line-height: 16px;
`;

const Value = styled.Text`
  font-size: 10px;
  line-height: 16px;
`;
