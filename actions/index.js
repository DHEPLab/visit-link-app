export const signIn = (data) => ({
  type: 'SIGN_IN',
  token: 'dummy-auth-token',
});

export const signOut = () => ({
  type: 'SIGN_OUT',
});
