const emailToProvider = require('./emailToProvider');

test('Main formats', () => {
  expect(() => { emailToProvider(null); }).toThrow('No email provided');
  expect(emailToProvider('hello@gmail.com')).toBe('google');
  expect(emailToProvider('hello@googlemail.com')).toBe('google');
  expect(emailToProvider('hello@google.com')).toBe('google');
  expect(emailToProvider('hello@yahoo.com')).toBe('yahoo');
  expect(emailToProvider('hello@live.com')).toBe('microsoft');
  expect(emailToProvider('hello@outlook.com')).toBe('microsoft');
  expect(emailToProvider('hello@icloud.com')).toBe('icloud');
  expect(emailToProvider('hello@proton.me')).toBe('proton');
  expect(emailToProvider('hello@protonmail.com')).toBe('proton');
});
test('Legacy formats', () => {
  expect(emailToProvider('hello@yahoo.co.uk')).toBe('yahoo');
  expect(emailToProvider('hello@yahoo.it')).toBe('yahoo');
  expect(emailToProvider('hello@yahoo.fr')).toBe('yahoo');
  expect(emailToProvider('hello@ymail.com')).toBe('yahoo');
  expect(emailToProvider('hello@rocketmail.com')).toBe('yahoo');
  expect(emailToProvider('hello@msn.com')).toBe('microsoft');
  expect(emailToProvider('hello@passport.com')).toBe('microsoft');
  expect(emailToProvider('hello@hotmail.com')).toBe('microsoft');
  expect(emailToProvider('hello@passport.net')).toBe('microsoft');
});
test('Regional and alias domains', () => {
  expect(emailToProvider('hello@yahoo.de')).toBe('yahoo');
  expect(emailToProvider('hello@yahoo.com.au')).toBe('yahoo');
  expect(emailToProvider('hello@yahoo.co.in')).toBe('yahoo');
  expect(emailToProvider('hello@hotmail.co.uk')).toBe('microsoft');
  expect(emailToProvider('hello@outlook.com.br')).toBe('microsoft');
  expect(emailToProvider('hello@live.fr')).toBe('microsoft');
  expect(emailToProvider('hello@me.com')).toBe('icloud');
  expect(emailToProvider('hello@mac.com')).toBe('icloud');
  expect(emailToProvider('hello@pm.me')).toBe('proton');
  expect(emailToProvider('hello@protonmail.ch')).toBe('proton');
});
test('Is case-insensitive and trims whitespace', () => {
  expect(emailToProvider('Hello@GMAIL.com')).toBe('google');
  expect(emailToProvider(' hello@gmail.com ')).toBe('google');
});
test('Does not match lookalike or unrelated domains', () => {
  expect(emailToProvider('hello@gmail.com.evil.org')).toBe(null);
  expect(emailToProvider('hello@gmailxcom')).toBe(null);
  expect(emailToProvider('hello@notgmail.com')).toBe(null);
  expect(emailToProvider('hello@myicloud.com')).toBe(null);
  expect(emailToProvider('hello@proton.me.uk')).toBe(null);
  expect(emailToProvider('gmail.com')).toBe(null);
});
test('Yahoo! Japan is not treated as Yahoo', () => {
  expect(emailToProvider('hello@yahoo.co.jp')).toBe('yahoojapan');
});
