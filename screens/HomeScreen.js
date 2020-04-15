import React from 'react';
import styled from 'styled-components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, View, ScrollView } from 'react-native';

export default function () {
  return (
    <SafeAreaView>
      <ScrollView>
        <Container>
          <DateText>April 15, 2020</DateText>
          <FlexContainer>
            <NextVisit>
              <NextVisitTitle>Your next visit is</NextVisitTitle>
              <Card>
                <CardTitle>Baby Info</CardTitle>
                <View>
                  <Row>
                    <Label>Time</Label>
                    <Value>10-11am</Value>
                  </Row>
                  <Row>
                    <Label>Location</Label>
                    <Value>吉林省延边朝鲜族自治州安图县朝阳街 836 号</Value>
                  </Row>
                </View>
                <Button title="Start" />
              </Card>
            </NextVisit>
            <VisitPlan>
              <VisitPlanTitle>Visit plan for Jan 20th</VisitPlanTitle>
            </VisitPlan>
          </FlexContainer>
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
}

const Container = styled.View``;

const DateText = styled.Text`
  padding-left: 12px;
  font-size: 36px;
  font-weight: bold;
`;

const FlexContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  height: 100%;
  margin-top: 10px;
  padding-bottom: 20px;
`;

const NextVisit = styled.View`
  width: 40%;
  margin-right: 10%;
`;

const VisitPlan = styled.View`
  width: 40%;
`;

const NextVisitTitle = styled.Text`
  font-size: 40px;
`;

const VisitPlanTitle = styled.Text`
  font-size: 28px;
  font-weight: bold;
`;

const Card = styled.View`
  margin-top: 20px;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
`;

const CardTitle = styled.Text`
  font-size: 18px;
  margin: 20px auto;
`;

const Row = styled.View`
  flex-direction: row;
  padding: 15px 10px;
`;

const Label = styled.Text`
  color: #bbb;
  font-size: 24px;
  padding-right: 20px;
`;

const Value = styled.Text`
  flex: 1;
  text-align: right;
  font-size: 18px;
`;
