import React from 'react';
import { styled } from '../utils/styled';
import {
  Button,
  LinearGradientHeader,
  Card,
  StaticForm,
  StaticField,
  BabyLine,
} from '../components';
import { useNavigation } from '@react-navigation/native';

export default function () {
  const { navigate } = useNavigation();

  return (
    <Container>
      <LinearGradientHeader>
        您的下一次家访：{'\n'}
        2020年06月30日/上午10:00{' '}
      </LinearGradientHeader>
      <CardContainer>
        <Card title="家访对象">
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
        <Card title="课程安排" right={<Button title="预览" />}>
          <LessonName>课程名称课程名称</LessonName>
          <StaticForm>
            <StaticField label="课堂01">课堂名称课堂名称课堂名称课堂名称课堂名称</StaticField>
            <StaticField label="课堂02">课堂名称课堂名称课堂名称课堂名称课堂名称</StaticField>
            <StaticField label="课堂03">课堂名称课堂名称课堂名称课堂名称课堂名称</StaticField>
          </StaticForm>
        </Card>
      </CardContainer>
      <ButtonContainer>
        <Button size="large" title="开始课程" onPress={() => navigate('Session')} />
      </ButtonContainer>
    </Container>
  );
}

const BabyLineContainer = styled.View`
  padding-bottom: 8px;
`;

const LessonName = styled.Text`
  color: #525252;
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const Container = styled.View`
  height: 100%;
`;

const CardContainer = styled.View`
  margin: 0 28px;
  margin-top: -34px;
`;
const ButtonContainer = styled.View`
  margin-top: 20px;
`;
