import React, { useEffect, useRef } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";

import Form from "./elements/Form";
import Card from "./elements/Card";
import FormItem from "./elements/FormItem";
import Input from "./elements/Input";
import Button from "./elements/Button";
import LargeButtonContainer from "./LargeButtonContainer";

import { styled } from "../utils/styled";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { ScrollView } from "react-native";
//TODO: wrap each overflow option
const autocompleteStyles = {
  listView: {
    width: 400,
    marginTop: -10,
    marginLeft: -12,
  },
  row: {
    width: 400,
  },
  textInput: {
    paddingVertical: 0,
    height: 40,
    fontSize: 15,
  },
  textInputContainer: {
    marginTop: -10,
    marginLeft: -10,
  },
  poweredContainer: {
    display: "none",
  },
};

export default function AddressForm({
  onSubmit,
  initialValues = {},
  submitting,
}) {
  const { t } = useTranslation("AddressForm");
  const autoCompleteRef = useRef();

  useEffect(() => {
    autoCompleteRef.current?.setAddressText(initialValues.area);
  }, []);

  const validationSchema = Yup.object().shape({
    area: Yup.string().max(200, t("locationMaxLength")).required(t("required")),
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
                  labelVerticalAlign={"top"}
                >
                  <ScrollView keyboardShouldPersistTaps={"always"}>
                    <GooglePlacesAutocomplete
                      ref={autoCompleteRef}
                      debounce={200}
                      styles={autocompleteStyles}
                      placeholder="England, London, Argyle Street 10, ABC Building"
                      fetchDetails={true}
                      listViewDisplayed={false}
                      onPress={(_, details) => {
                        if (!details) {
                          return;
                        }
                        //TODO: check exact times this component calls for autocomplete and geocoding
                        setFieldValue("area", details.formatted_address, true);
                        setFieldValue(
                          "latitude",
                          details.geometry.location.lat,
                        );
                        setFieldValue(
                          "longitude",
                          details.geometry.location.lng,
                        );
                      }}
                      query={{
                        key: "API_KEY", //TODO: replace with real key
                        language: "en",
                      }}
                    />
                  </ScrollView>
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

const Container = styled.View`
  padding: 20px 28px;
`;
