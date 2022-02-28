export default function confirmModal(
    state = {visible: false},
    action
) {
    switch (action.type) {
        case 'SET_CONFIRM_MODAL_VALUE':
            return action.payload;
        case 'CLOSE_CONFIRM_MODAL':
            return {visible: false}
        default:
            return state;
    }
}
