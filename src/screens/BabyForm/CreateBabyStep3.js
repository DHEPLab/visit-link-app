import React from "react";
import { CommonActions } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { CreateBabyNavigator, AddressForm, Message } from "../../components";
import http from "../../utils/http";
import { useBoolState } from "../../utils";
import storage from "../../cache/storage";

export default function CreateBabyStep3({ navigation, route }) {
  const { t } = useTranslation("CreateBabyStep3");
  const { params } = route;
  const { baby, carers } = params;
  console.log(params);
  const [visible, openMessage, closeMessage] = useBoolState();
  const [submitting, startSubmit, endSubmit] = useBoolState();
  const { isConnected } = useSelector((state) => state.net);

  async function onSubmit(values) {
    startSubmit();
    if (!isConnected) {
      const babyInfo = { ...baby, ...values };
      const carer = carers.find((e) => e.master === true);
      const offlineBaby = {
        ...babyInfo,
        allCarerList: carers,
        baby: babyInfo,
        carers,
        carerName: carer.name,
        carerPhone: carer.phone,
        months: -1,
        days: -1,
        identity: null,
        location: values.location,
        approved: false,
        pastEdc: false,
      };
      const oldBabies = await storage.getOfflineBabies();
      await storage.setOfflineBabies([...(oldBabies || []), offlineBaby]);
      openMessage();
      setTimeout(() => {
        closeMessage();
        navigateToHome();
      }, 1000);
    } else {
      http
        .post("/api/babies", {
          baby: {
            ...baby,
            ...values,
          },
          carers,
        })
        .then((data) => {
          openMessage();
          setTimeout(() => {
            closeMessage();
            navigateToHome(data);
          }, 1000);
        })
        .finally(() => {
          endSubmit();
        });
    }
  }

  function navigateToHome(data) {
    navigation.dispatch((state) => {
      const [home] = state.routes;
      return CommonActions.reset({
        index: 0,
        routes: [home],
      });
    });
    if (data) {
      navigation.navigate("Baby", { ...data, tab: "family" });
    } else {
      navigation.navigate("Babies", {});
    }
  }

  return (
    <>
      <CreateBabyNavigator active={3} navigation={navigation} />
      <AddressForm onSubmit={onSubmit} submitting={submitting} />
      <Message
        visible={visible}
        title={t("submitSuccess")}
        content={t("submitMessage")}
      />
    </>
  );
}
