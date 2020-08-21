import { responseContentTypeJSON } from './http';

it('should response content type is json', () => {
  expect(
    responseContentTypeJSON({
      headers: {
        get: () => 'application/json',
      },
    })
  ).toBeTruthy();
});
