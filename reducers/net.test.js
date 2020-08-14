import net from './net';

it('should switch net type to callular', () => {
  expect(
    net(undefined, {
      type: 'NET_INFO',
      payload: {
        type: 'callular',
        isConnected: true,
      },
    })
  ).toStrictEqual({
    type: 'callular',
    isConnected: true,
  });
});

it('should switch net type to wifi', () => {
  expect(
    net(undefined, {
      type: 'NET_INFO',
      payload: {
        type: 'Wifi',
        isConnected: true,
      },
    })
  ).toStrictEqual({
    type: 'Wifi',
    isConnected: true,
  });
});

it('should switch net type none, connected false', () => {
  expect(
    net(undefined, {
      type: 'NET_INFO',
      payload: {
        type: 'none',
        isConnected: false,
      },
    })
  ).toStrictEqual({
    type: 'none',
    isConnected: false,
  });
});
