import { signIn, signOut, restoreToken } from './index';

it('should sign in', () => {
  expect(signIn({ idToken: 'token' })).toStrictEqual({ type: 'RESTORE_TOKEN', token: 'token' });
});

it('should sign out', () => {
  expect(signOut()).toStrictEqual({ type: 'SIGN_OUT' });
});

it('should restore token', () => {
  expect(restoreToken('token1')).toStrictEqual({ type: 'RESTORE_TOKEN', token: 'token1' });
});
