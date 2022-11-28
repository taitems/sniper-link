const buildUrl = require('./buildUrl');

describe('url building for', () => {
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
});

describe('provider overriding', () => {
  test('returns empty when not set', () => {
    const result = buildUrl({
      email: 'tait-brown@company.com',
      from: '@userfront.com',
      daysAgo: 20,
    });
    expect(result.provider).toBe(null);
    expect(result.link).toBe(null);
  });
  test('works when provided', () => {
    const result = buildUrl({
      email: 'tait-brown@company.com',
      forceProvider: 'google',
      from: '@userfront.com',
      hoursAgo: 3,
    });
    expect(result.provider).toBe('google');
    expect(result.link).toContain('mail.google.com');
    expect(result.link).toContain('3h');
  });
});
