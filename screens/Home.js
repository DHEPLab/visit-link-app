import React from 'react';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { styled } from '../utils/styled';
import {
  Button,
  LinearGradientHeader,
  Card,
  StaticForm,
  StaticField,
  BabyLine,
} from '../components';

export default function Home() {
  const { navigate } = useNavigation();

  return (
    <Container>
      <LinearGradientHeader>
        您的下一次家访：{'\n'}
        2020年06月30日/上午10:00
      </LinearGradientHeader>
      <CardContainer>
        <Card title="家访对象" background={require('../assets/images/baby-bg.png')}>
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
        <Card title="课堂安排" right={<Button title="预览" />}>
          <LessonName>课堂名称</LessonName>
          <StaticForm>
            <StaticField label="模块01">模块名称</StaticField>
            <StaticField label="模块02">模块名称</StaticField>
            <StaticField label="模块03">模块名称</StaticField>
          </StaticForm>
        </Card>
      </CardContainer>
      <ButtonContainer>
        <Button size="large" title="开始课堂" onPress={() => navigate('LessonIntro')} />
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

const Container = styled(ScrollView)`
  height: 100%;
`;

const CardContainer = styled.View`
  margin: 0 28px;
  margin-top: -34px;
`;
const ButtonContainer = styled.View`
  margin-top: 20px;
  margin-bottom: 10px;
`;
