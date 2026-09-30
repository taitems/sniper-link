const inboxProviders = require('./inboxProviders');
const emailToProvider = require('./emailToProvider');
const buildUrl = require('./buildUrl');

const entries = Object.keys(inboxProviders).flatMap((provider) => inboxProviders[provider]
  .domains.map((domain) => [provider, domain]));

describe('inbox-only providers', () => {
  test.each(entries)('%s detects %s', (provider, domain) => {
    expect(emailToProvider(`hello@${domain}`)).toBe(provider);
    expect(emailToProvider(`Hello@${domain.toUpperCase()}`)).toBe(provider);
  });

  test.each(entries)('%s links %s to its webmail', (provider, domain) => {
    const { inbox, regional = {} } = inboxProviders[provider];
    const result = buildUrl({ email: `hello@${domain}` });
    expect(result.provider).toBe(provider);
    expect(result.link).toBe(regional[domain] || inbox);
  });

  test('every domain belongs to exactly one provider', () => {
    const domains = entries.map(([, domain]) => domain);
    expect(new Set(domains).size).toBe(domains.length);
  });

  test('regional overrides only reference listed domains', () => {
    Object.values(inboxProviders).forEach(({ domains, regional = {} }) => {
      Object.keys(regional).forEach((domain) => expect(domains).toContain(domain));
    });
  });

  test('from and dates are ignored', () => {
    const result = buildUrl({
      email: 'hello@qq.com', from: '@userfront.com', daysAgo: 2, hoursAgo: 3,
    });
    expect(result.link).toBe('https://mail.qq.com/');
  });

  test('regional webmail is chosen per domain', () => {
    expect(buildUrl({ email: 'hello@126.com' }).link).toBe('https://mail.126.com/');
    expect(buildUrl({ email: 'hello@gmx.co.uk' }).link).toBe('https://www.gmx.co.uk/');
    expect(buildUrl({ email: 'hello@zohomail.eu' }).link).toBe('https://mail.zoho.eu/');
  });

  test('forceProvider falls back to the default inbox for custom domains', () => {
    expect(buildUrl({ email: 'jo@company.com', forceProvider: 'zoho' }).link).toBe('https://mail.zoho.com/');
    expect(buildUrl({ forceProvider: 'fastmail' }).link).toBe('https://app.fastmail.com/');
  });

  test('does not match lookalike domains', () => {
    expect(emailToProvider('hello@qq.com.evil.org')).toBe(null);
    expect(emailToProvider('hello@notaol.com')).toBe(null);
  });
});
