import React, { useEffect, useState } from "react";
import { ScrollView, ToastAndroid, View } from "react-native";
import Arrays from "lodash/array";
import { useTranslation } from "react-i18next";

import { styled } from "@/utils/styled";
import {
  Button,
  CarerItem,
  CreateBabyNavigator,
  LargeButtonContainer,
} from "../../components";

export function useMethods() {
  const { t } = useTranslation("CreateBabyStep2");

  function keepMasterCarerUnique(carers, masterCarerIndex) {
    return carers.map((carer, index) => {
      carer.master = index === masterCarerIndex;
      return carer;
    });
  }

  return {
    keepMasterCarerUnique,

    pullAt: (array, index) => {
      const clone = [...array];
      Arrays.pullAt(clone, [index]);
      return clone;
    },

    replace: (array, index, object) => {
      let clone = [...array];
      clone[index] = object;
      if (object.master) clone = keepMasterCarerUnique(clone, index);
      return clone;
    },

    handleNextStep: (navigation, baby, carers) => {
      let hasMaster = false;
      for (const carer of carers) {
        if (carer.master) {
          hasMaster = true;
          break;
        }
      }
      if (!hasMaster)
        return ToastAndroid.show(t("setPrimaryCarer"), ToastAndroid.LONG);

      navigation.navigate("CreateBabyStep3", { baby, carers });
    },

    create: (dataSource, carer) => {
      return carer.master
        ? keepMasterCarerUnique([...dataSource, carer], dataSource.length)
        : [...dataSource, carer];
    },

    familyTies(carers, exclude) {
      return carers
        .filter((c) => c.familyTies !== exclude)
        .map((c) => c.familyTies);
    },
  };
}

export default function CreateBabyStep2({ navigation, route }) {
  const { t } = useTranslation("CreateBabyStep2");
  const { params } = route;
  const { baby } = params;
  const [carers, setCarers] = useState([]);
  const {
    pullAt,
    keepMasterCarerUnique,
    replace,
    handleNextStep,
    create,
    familyTies,
  } = useMethods();

  function handleDelete(index) {
    setCarers(pullAt(carers, index));
  }

  function onChangeMaster(index) {
    setCarers(keepMasterCarerUnique(carers, index));
  }

  useEffect(() => {
    if (!route.params.carer) return;
    route.params.carerIndex === -1
      ? // create new carer
        setCarers(create(carers, route.params.carer))
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
              <Title>{t("carerList")}</Title>
              <SubTitle>{t("maxCarers")}</SubTitle>
            </View>
            <Button
              disabled={carers.length > 3}
              title={t("addCarer")}
              onPress={() =>
                navigation.navigate("CreateCarer", {
                  from: "CreateBabyStep2",
                  filterFamilyTies: familyTies(carers),
                })
              }
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
                onChangeMaster={() => onChangeMaster(index)}
                onPressModify={() =>
                  navigation.navigate("EditCarer", {
                    carer,
                    carerIndex: index,
                    from: "CreateBabyStep2",
                    filterFamilyTies: familyTies(carers, carer.familyTies),
                  })
                }
              />
            ))}
          </CarerListContainer>

          <LargeButtonContainer>
            <Button
              disabled={carers.length === 0}
              size="large"
              title={t("nextStep")}
              onPress={() => handleNextStep(navigation, baby, carers)}
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
