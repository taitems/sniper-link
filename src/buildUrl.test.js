const buildUrl = require('./buildUrl');

test('gmail', () => {
  const result = buildUrl({
    email: 'hello@gmail.com',
    from: 'taitbrown@gmail.com',
    daysAgo: 20,
  });
  expect(result.link).toContain('taitbrown');
  expect(result.link).toContain('20d');
});

test('outlook', () => {
  const result = buildUrl({
    email: 'findme@outlook.com',
  });
  expect(result.link).toContain('findme');
});
