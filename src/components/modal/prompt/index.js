import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closePromptModal, setPromptModalValue } from "@/actions";
import { Modal } from "../../index";
import Input from "../../elements/Input";
import { ToastAndroid } from "react-native";
import i18next from "i18next";

/**
 * Displays a prompt modal with the given title and options.
 *
 * @param {string} title - The title to be displayed on the prompt modal.
 * @param {Object} options - The options for configuring the prompt modal.
 * @param {string} [options.defaultValue] - The default value to be displayed in the prompt input field (optional).
 * @param {string} [options.okText] - The text to be displayed on the OK button (optional).
 * @param {string} [options.cancelText] - The text to be displayed on the Cancel button (optional).
 * @param {(string) => void} [options.onOk] - The callback function to be executed when the OK button is clicked (optional).
 * @param {(action: any) => void} options.dispatch - The function to dispatch the action that opens the prompt modal.
 *
 * @returns {void} This function does not return anything.
 */
const prompt = (
  title,
  { defaultValue, okText, cancelText, onOk, dispatch },
) => {
  dispatch(
    setPromptModalValue({
      visible: true,
      title,
      okText,
      cancelText,
      onOk,
      defaultValue,
    }),
  );
};

export const PromptModal = () => {
  const confirmModal = useSelector((state) => state.modal.prompt);
  const dispatch = useDispatch();
  const {
    title = i18next.t("ConfirmModal:defaultTitle"),
    okText = i18next.t("ConfirmModal:confirm"),
    cancelText = i18next.t("ConfirmModal:cancel"),
    onOk,
    visible,
    defaultValue,
    required = true,
  } = confirmModal || {};
  const [value, setValue] = useState(defaultValue);
  const closeModal = () => {
    dispatch(closePromptModal());
    setValue("");
  };
  return (
    <Modal
      title={title}
      visible={visible}
      content={
        <Input
          value={value}
          onChangeText={setValue}
          border
          placeholder={i18next.t("Form:pleaseInput")}
        />
      }
      okText={okText}
      cancelText={cancelText}
      onCancel={closeModal}
      onOk={() => {
        if (required && !value) {
          ToastAndroid.show(
            i18next.t("Form:pleaseInput") + title,
            ToastAndroid.LONG,
          );
          return;
        }
        const result = onOk && onOk(value);
        if (result instanceof Promise) {
          result.finally(closeModal);
        } else if (result) {
          closeModal();
        }
      }}
    />
  );
};
export default prompt;
