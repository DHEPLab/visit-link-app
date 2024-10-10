import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import * as Yup from "yup";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";
import { debounce } from "lodash";
import Autocomplete from "react-native-autocomplete-input";

import Form from "./elements/Form";
import Card from "./elements/Card";
import FormItem from "./elements/FormItem";
import Input from "./elements/Input";
import Button from "./elements/Button";
import LargeButtonContainer from "./LargeButtonContainer";
import http from "../utils/http";

import { styled } from "../utils/styled";

export default function AddressForm({
  onSubmit,
  initialValues = {},
  submitting,
}) {
  const { t } = useTranslation("AddressForm");

  const [options, setOptions] = useState([]);
  const [hideAutoCompelete, setHideAutoCompelete] = useState(false);

  const onSearch = debounce((value) => {
    setHideAutoCompelete(false);
    http
      .get(`/api/babies/place/autocomplete?area=${value}`)
      .then((data) => {
        if (data.status === "OK") {
          const options = data.predictions.map((prediction) => ({
            id: prediction.place_id,
            value: prediction.description,
          }));
          setOptions(options);
        } else {
          setOptions([]);
        }
      })
      .catch(() => {
        setOptions([]);
      });
  }, 200);

  const validationSchema = Yup.object().shape({
    area: Yup.string().max(100, t("areaMaxLength")).required(t("required")),
    location: Yup.string()
      .max(200, t("locationMaxLength"))
      .required(t("required")),
  });

  return (
    <Container>
      <Formik
        initialValues={initialValues}
        validateOnChange={false}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ handleSubmit, values, setFieldValue }) => (
          <>
            <Card title={t("addressInfo")} noPadding>
              <Form>
                <FormItem
                  name="area"
                  label={t("area")}
                  labelWidth={44}
                  labelAlign={"right"}
                  noBorder
                  style={styles.formItem}
                  onBlur={() => {
                    const area = values.area;
                    const isSlectedOption =
                      area && options.some((opt) => opt.value === area);
                    if (!isSlectedOption) {
                      http
                        .get(`/api/babies/place/location`, { area: area })
                        .then((geo) => {
                          setFieldValue("latitude", geo.lat);
                          setFieldValue("longitude", geo.lng);
                        })
                        .catch(() => {
                          setFieldValue("latitude", undefined);
                          setFieldValue("longitude", undefined);
                        });
                    }
                    setHideAutoCompelete(true);
                  }}
                >
                  <Autocomplete
                    data={options}
                    autoCorrect={false}
                    hideResults={hideAutoCompelete}
                    inputContainerStyle={{
                      borderWidth: 0,
                      borderBottomWidth: 1,
                    }}
                    onChangeText={(value) => {
                      setFieldValue("area", value);
                      onSearch(value);
                    }}
                    placeholder={t("selectArea")}
                    flatListProps={{
                      keyboardShouldPersistTaps: "always",
                      keyExtractor: (option) => option.id,
                      renderItem: ({ item }) => (
                        <TouchableOpacity
                          onPress={() => {
                            setFieldValue("area", item.value);
                            setHideAutoCompelete(true);
                            http
                              .get(`/api/babies/place/location`, {
                                placeId: item.id,
                              })
                              .then((geo) => {
                                setFieldValue("latitude", geo.lat);
                                setFieldValue("longitude", geo.lng);
                              })
                              .catch(() => {
                                setFieldValue("latitude", undefined);
                                setFieldValue("longitude", undefined);
                              });
                          }}
                        >
                          <Text style={styles.item}>{item.value}</Text>
                        </TouchableOpacity>
                      ),
                      style: styles.lists,
                    }}
                  />
                </FormItem>
                <FormItem
                  name="location"
                  label={t("detailedAddress")}
                  labelWidth={44}
                  labelAlign={"right"}
                  labelVerticalAlign={"start"}
                  noBorder
                >
                  <Input
                    placeholder={t("enterDetailedAddress")}
                    multiline={true}
                  />
                </FormItem>
              </Form>
            </Card>
            <LargeButtonContainer>
              <Button
                size="large"
                title={t("submit")}
                disabled={submitting}
                onPress={handleSubmit}
              />
            </LargeButtonContainer>
          </>
        )}
      </Formik>
    </Container>
  );
}

const styles = StyleSheet.create({
  formItem: {
    marginBottom: 60,
  },
  lists: {
    height: 68,
  },
  item: {
    fontSize: 15,
    margin: 2,
  },
});

const Container = styled.View`
  padding: 20px 28px;
`;
