import React from 'react';

import http from '../../utils/http';
import {AddressForm} from '../../components';
import confirm from "../../components/confirm";
import {useDispatch} from "react-redux";

export default function EditAddress({ navigation, route }) {
  const { params } = route;
  const dispatch = useDispatch()

  async function onSubmit(values) {
    if (!params.id) return;
    confirm("确认修改宝宝信息吗？", {
      onOk: async (close) => {
        await http.put(`/api/babies/${params.id}/address`, values).finally(close);
        navigation.navigate(params.from, {
          success: Math.random(),
        });
      }
    }, dispatch)
  }

  return <>
    <AddressForm initialValues={params.address} onSubmit={onSubmit} />
  </>
}
