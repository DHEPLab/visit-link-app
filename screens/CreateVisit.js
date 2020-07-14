import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { styled } from '../utils/styled';
import { useBoolState } from '../utils';
import { BabyLine, Card, Button, StaticField, StaticForm } from '../components';

export default function CreateVisit() {
  const [date, setDate] = useState(new Date());
  const { navigate } = useNavigation();
  const [show, openPicker] = useBoolState();

  function onChange(event, selectedDate) {
    console.log(event, selectedDate);
  }

  return (
    <Container>
      <Card title="家访时间" right={<Button title="修改" onPress={openPicker} />}>
        <StaticForm>
          <StaticField label="家访时间">2020年05月22日 /上午10:00</StaticField>
        </StaticForm>
      </Card>
      <Card
        title="家访对象"
        right={<Button title="选择" onPress={() => navigate('PickBaby')} />}
        background={require('../assets/images/baby-bg.png')}
      >
        <BabyLineContainer>
          <BabyLine
            name="张三李四张三李四张三"
            gender="MALE"
            stage="EDC"
            month={10}
            identity="123456"
          />
        </BabyLineContainer>
        <StaticForm>
          <StaticField label="主照料人">张三李四张三李四</StaticField>
          <StaticField label="联系电话">18616881618</StaticField>
          <StaticField label="微信号码">18616881618</StaticField>
          <StaticField label="所在区域">吉林省/延边朝鲜自治州/安图县</StaticField>
          <StaticField label="详细地址">朝阳街826号</StaticField>
        </StaticForm>
      </Card>
      <Card title="课程安排">
        <LessonName>课堂名称</LessonName>
        <StaticForm>
          <StaticField label="模块01">模块名称</StaticField>
          <StaticField label="模块02">模块名称</StaticField>
          <StaticField label="模块03">模块名称</StaticField>
        </StaticForm>
      </Card>
      {show && (
        <DateTimePicker
          value={date}
          mode={'date'}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
      <ButtonContainer>
        <Button title="提交" size="large" />
      </ButtonContainer>
    </Container>
  );
}

const Container = styled(ScrollView)`
  padding: 20px 28px;
  height: 100%;
`;

const ButtonContainer = styled.View`
  padding-top: 30px;
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
