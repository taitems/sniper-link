const buildUrl = require('./buildUrl');
const sniperLink = require('./index');

describe('url building for', () => {
  beforeAll(() => {
    jest.useFakeTimers('modern').setSystemTime(new Date('2020-01-31T00:00:00.000+00:00'));
  });

  test('gmail', () => {
    const result = buildUrl({
      email: 'hello@gmail.com',
      from: 'taitbrown@gmail.com',
      daysAgo: 20,
    });
    expect(result.link).toBe('https://mail.google.com/mail/u/hello@gmail.com/#search/from%3A(taitbrown%40gmail.com)+in%3Aanywhere+newer_than%3A20d');
  });

  test('gmail hours', () => {
    const result = buildUrl({ email: 'hello@gmail.com', from: '@userfront.com', hoursAgo: 3 });
    expect(result.link).toContain('+after%3A1580418000');
    expect(result.link).not.toContain('newer_than');
  });

  test('gmail encodes plus-addressed accounts and special senders', () => {
    const result = buildUrl({ email: 'me+tag@gmail.com', from: 'a&b #co' });
    expect(result.link).toBe('https://mail.google.com/mail/u/me%2Btag@gmail.com/#search/from%3A(a%26b%20%23co)+in%3Aanywhere');
  });

  test('gmail without from', () => {
    const result = buildUrl({ email: 'hello@gmail.com' });
    expect(result.link).toBe('https://mail.google.com/mail/u/hello@gmail.com/#search/in%3Aanywhere');
  });

  test('outlook', () => {
    const result = buildUrl({ email: 'find+me@outlook.com' });
    expect(result.link).toBe('https://outlook.live.com/mail/?login_hint=find%2Bme%40outlook.com');
  });

  test('yahoo double-encodes the whole keyword, including the date', () => {
    const result = buildUrl({ email: 'hello@yahoo.com', from: '@userfront.com', daysAgo: 2 });
    expect(result.link).toBe('https://mail.yahoo.com/d/search/keyword=from%253A%2540userfront.com%2520after%253A%25222020-01-29%2522');
    expect(result.link).not.toMatch(/[ "]/);
  });

  test('yahoo without from or date falls back to the inbox', () => {
    expect(buildUrl({ email: 'hello@yahoo.com' }).link).toBe('https://mail.yahoo.com/');
  });

  test('proton', () => {
    const result = buildUrl({ email: 'hello@proton.me', from: '@userfront.com', daysAgo: 9 });
    expect(result.link).toBe('https://mail.proton.me/u/0/all-mail#from=%40userfront.com&begin=1579651200');
    expect(buildUrl({ email: 'hello@proton.me' }).link).toBe('https://mail.proton.me/u/0/all-mail');
  });

  test('never emits "undefined"', () => {
    ['hello@gmail.com', 'hello@yahoo.com', 'hello@proton.me', 'hello@outlook.com', 'hello@icloud.com']
      .forEach((email) => expect(buildUrl({ email }).link).not.toContain('undefined'));
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
    expect(result.link).toContain('mail.google.com/mail/u/tait-brown@company.com/');
    expect(result.link).toContain('after%3A');
  });
  test('throws on an unknown provider', () => {
    expect(() => buildUrl({ email: 'a@b.com', forceProvider: 'gmail' })).toThrow('Unknown provider "gmail"');
  });
});

describe('package entry point', () => {
  test('passes every option through', () => {
    const result = sniperLink({
      email: 'tait-brown@company.com',
      forceProvider: 'google',
      from: '@userfront.com',
      daysAgo: 1,
    });
    expect(result.provider).toBe('google');
    expect(result.link).toContain('newer_than%3A1d');
  });
});
