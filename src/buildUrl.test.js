const buildUrl = require('./buildUrl');

test('gmail', () => {
  const result = buildUrl({
    email: 'hello@gmail.com',
    from: 'taitbrown@gmail.com',
  });
  expect(result.link).toContain('taitbrown');
});

test('outlook', () => {
  const result = buildUrl({
    email: 'findme@outlook.com',
  });
  expect(result.link).toContain('findme');
});
