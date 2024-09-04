import React from "react";
import { styled } from "../utils/styled";
import { Form, FormItem, Input, Button } from "../components";
import { useTranslation } from "react-i18next";

export default function ChangeProfile() {
  const { t } = useTranslation();
  return (
    <Container>
      <Form>
        <FormItem label={t("CreateCarer:realName")}>
          <Input placeholder={t("CreateCarer:realNamePlaceholder")} />
        </FormItem>
        <FormItem label={t("CreateCarer:phoneNumber")}>
          <Input placeholder={t("CreateCarer:enterPhone")} />
        </FormItem>
        <FormItem label={t("AddressForm:area")} last>
          <Input placeholder={t("AddressForm:selectArea")} />
        </FormItem>
      </Form>
      <ButtonContainer>
        <Button size="large" title={t("AddressForm:submit")} />
      </ButtonContainer>
    </Container>
  );
}

const Container = styled.View`
  padding: 20px 28px;
`;

const ButtonContainer = styled.View`
  margin-top: 50px;
`;
