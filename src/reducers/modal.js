export default function modal(
  state = {
    confirm: { visible: false },
    prompt: { visible: false },
  },
  action,
) {
  switch (action.type) {
    case "SET_CONFIRM_MODAL_VALUE":
      return { ...state, confirm: action.payload };
    case "CLOSE_CONFIRM_MODAL":
      return { ...state, confirm: { visible: false } };
    case "SET_PROMPT_MODAL_VALUE":
      return { ...state, prompt: action.payload };
    case "CLOSE_PROMPT_MODAL":
      return { ...state, prompt: { visible: false } };
    default:
      return state;
  }
}
