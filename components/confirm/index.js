import React from "react"
import {useDispatch, useSelector} from "react-redux";
import {closeConfirmModal, setConfirmModalValue} from "../../actions";
import {Modal} from "../index";

const confirm = (contentText, {title, okText, cancelText, onOk}, dispatch) => {
    dispatch(setConfirmModalValue({
        visible: true, title, okText, cancelText, onOk, contentText
    }))
}

export const ConfirmModal = () => {
    const confirmModal = useSelector((state) => state.confirmModal);
    const dispatch = useDispatch();
    const {
        title= "提示信息", contentText= "确认{{content}}？",
        okText= "确认", cancelText= "取消",
        onOk, visible
    } = confirmModal||{};
    const closeModal = () => {
        dispatch(closeConfirmModal());
    }
    return (
        <Modal title={title} visible={visible}
               contentText={contentText}
               okText={okText} cancelText={cancelText}
               onOk={() => {
                   onOk && onOk(closeModal)
               }}
               onCancel={closeModal}
        />
    )
}
export default confirm;