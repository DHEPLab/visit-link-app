import React from "react"
import { useDispatch, useSelector } from "react-redux";
import { closeConfirmModal, closePromptModal, setConfirmModalValue } from "../../../actions";
import { Modal } from "../../index";
import { useTranslation } from 'react-i18next';

const confirm = (contentText, { title, okText, cancelText, onOk, dispatch }) => {
    dispatch(setConfirmModalValue({
        visible: true, title, okText, cancelText, onOk, contentText
    }))
}

export const ConfirmModal = () => {
    const { t } = useTranslation('ConfirmModal');
    const confirmModal = useSelector((state) => state.modal.confirm);
    const dispatch = useDispatch();
    const {
        title = t('defaultTitle'),
        contentText = t('defaultContent'),
        okText = t('confirm'),
        cancelText = t('cancel'),
        onOk,
        visible
    } = confirmModal || {};

    const closeModal = () => {
        dispatch(closeConfirmModal());
    }

    return (
        <Modal
            title={title}
            visible={visible}
            contentText={contentText}
            okText={okText}
            cancelText={cancelText}
            onOk={() => {
                const result = onOk && onOk()
                if (result instanceof Promise) {
                    result.finally(closeModal)
                } else if (result) {
                    closeModal()
                }
            }}
            onCancel={closeModal}
        />
    )
}

export default confirm;