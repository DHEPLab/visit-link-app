export const signIn = ({ idToken }) => ({
  type: 'RESTORE_TOKEN',
  token: idToken,
});

export const signOut = () => ({
  type: 'SIGN_OUT',
});

export const restoreToken = (token) => ({
  type: 'RESTORE_TOKEN',
  token,
});

export const netInfo = (state) => ({
  type: 'NET_INFO',
  payload: state,
});

export const lessonsUpdate = (payload) => ({
  type: 'LESSONS_UPDATE',
  payload,
});
