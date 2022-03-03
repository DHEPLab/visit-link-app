import React, {useState} from "react"
import {useDispatch, useSelector} from "react-redux";
import {closePromptModal, setPromptModalValue} from "../../../actions";
import {Modal} from "../../index";
import Input from "../../elements/Input";
import {ToastAndroid} from "react-native";

const prompt = (title, {defaultValue, okText, cancelText, onOk, dispatch}) => {
    dispatch(setPromptModalValue({
        visible: true, title, okText, cancelText, onOk, defaultValue
    }))
}

export const PromptModal = () => {
    const confirmModal = useSelector((state) => state.modal.prompt);
    const dispatch = useDispatch();
    const {
        title= "提示信息",
        okText= "确认", cancelText= "取消",
        onOk, visible, defaultValue, required = true
    } = confirmModal||{};
    const [value, setValue] = useState(defaultValue);
    const closeModal = () => {
        dispatch(closePromptModal());
        setValue("")
    }
    return (
        <Modal title={title}
            visible={visible}
            content={<Input value={value} onChangeText={setValue} border placeholder="请输入" />}
            okText={okText}
            cancelText={cancelText}
            onCancel={closeModal}
            onOk={() => {
                if (required && !value) {
                    ToastAndroid.show("请填写" + title, ToastAndroid.LONG);
                    return
                }
                const result = onOk && onOk(value)
                if (result instanceof Promise) {
                    result.finally(closeModal)
                } else if (result) {
                    closeModal()
                }
            }}
        />
    )
}
export default prompt;