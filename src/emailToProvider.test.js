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
