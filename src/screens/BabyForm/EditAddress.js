import React from "react";

import http from "../../utils/http";
import { AddressForm } from "../../components";
import confirm from "../../components/modal/confirm";
import { useDispatch } from "react-redux";
import i18next from "i18next";

export default function EditAddress({ navigation, route }) {
  const { params } = route;
  const dispatch = useDispatch();

  async function onSubmit(values) {
    if (!params.id) return;
    confirm(i18next.t("CreateCarer:confirmEdit"), {
      onOk: async () => {
        await http.put(`/api/babies/${params.id}/address`, values);
        navigation.navigate(params.from, {
          ...(params.prevParams || {}),
          success: Math.random(),
        });
      },
      dispatch,
    });
  }

  return (
    <>
      <AddressForm initialValues={params.address} onSubmit={onSubmit} />
    </>
  );
}
