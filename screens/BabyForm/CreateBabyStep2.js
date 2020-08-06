import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import Arrays from 'lodash/array';

import { styled } from '../../utils/styled';
import { CarerItem, CreateBabyNavigator, LargeButtonContainer, Button } from '../../components';

export default function CreateBabyStep2({ navigation, route }) {
  const { params } = route;
  const { baby } = params;
  const [carers, setCarers] = useState([]);

  function replace(array, index, object) {
    const clone = [...array];
    clone[index] = object;
    return clone;
  }

  function pullAt(array, index) {
    const clone = [...array];
    Arrays.pullAt(clone, [index]);
    return clone;
  }

  function handleDelete(index) {
    setCarers(pullAt(carers, index));
  }

  function handleNextStep() {
    navigation.navigate('CreateBabyStep3', { baby, carers });
  }

  useEffect(() => {
    if (!route.params.carer) return;
    route.params.carerIndex === -1
      ? // add new carer
        setCarers([...carers, route.params.carer])
      : // edit old carer
        setCarers(replace(carers, route.params.carerIndex, route.params.carer));
  }, [route.params.carer]);

  return (
    <>
      <CreateBabyNavigator active={2} navigation={navigation} />
      <ScrollView>
        <Container>
          <ListHeader>
            <View>
              <Title>看护人列表</Title>
              <SubTitle>最多可添加4位看护人</SubTitle>
            </View>
            <Button
              disabled={carers.length > 3}
              title="添加看护人"
              onPress={() => navigation.navigate('CreateCarer')}
            />
          </ListHeader>

          <CarerListContainer>
            {carers.map((carer, index) => (
              <CarerItem
                number={index + 1}
                key={carer.familyTies}
                value={carer}
                noBorder={index === carers.length - 1}
                onPressDelete={() => handleDelete(index)}
                onPressModify={() => navigation.navigate('EditCarer', { carer, carerIndex: index })}
              />
            ))}
          </CarerListContainer>

          <LargeButtonContainer>
            <Button
              disabled={carers.length === 0}
              size="large"
              title="下一步"
              onPress={handleNextStep}
            />
          </LargeButtonContainer>
        </Container>
      </ScrollView>
    </>
  );
}

const CarerListContainer = styled.View`
  border-radius: 8px;
  padding: 0 24px;
  background: #fff;
  margin-top: 20px;
`;

const Container = styled.View`
  padding: 20px 28px;
`;

const ListHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const Title = styled.Text`
  color: #525252;
  font-size: 12px;
  font-weight: bold;
`;

const SubTitle = styled.Text`
  color: #8e8e93;
  font-size: 10px;
  margin-top: 10px;
`;
