export default function LessonsUpdate(state = { isAvailable: false, firstTime: false }, action) {
  switch (action.type) {
    case 'LESSONS_UPDATE':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
