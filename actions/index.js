export const signIn = ({ idToken }) => ({
  type: 'SIGN_IN',
  token: idToken,
});

export const signOut = () => ({
  type: 'SIGN_OUT',
});

export const restoreToken = (token) => ({
  type: 'RESTORE_TOKEN',
  token,
});
