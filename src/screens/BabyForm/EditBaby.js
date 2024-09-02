import React from "react";

import http from "../../utils/http";
import BabyForm from "./BabyForm";
import { styled } from "@/utils/styled";
import storage from "../../cache/storage";
import confirm from "../../components/modal/confirm";
import { useDispatch } from "react-redux";
import i18next from "i18next";

export default function EditBaby({ navigation, route }) {
  const { params } = route;
  const dispatch = useDispatch();
  function onSubmit(values) {
    if (!params.id) return;
    confirm(i18next.t("CreateCarer:confirmEdit"), {
      onOk: async () => {
        await http.put(`/api/babies/${params.id}`, values);
        clearNotSubmitVisit();
        navigation.navigate(params.from, {
          success: Math.random(),
          ...params,
        });
      },
      dispatch,
    });
  }

  async function clearNotSubmitVisit() {
    const offlineVisits = (await storage.getOfflineVisits()) || [];
    const deleteArray = offlineVisits.filter((n) => n.id === params.id);
    storage.setOfflineVisits(deleteArray);
  }

  return (
    <Container>
      <BabyForm onSubmit={onSubmit} initialValues={params.baby} />
    </Container>
  );
}

const Container = styled.View`
  padding: 20px 28px;
`;
