const buildDate = require('./buildDate');
const emailToProvider = require('./emailToProvider');

const encode = encodeURIComponent;
const compact = (items) => items.filter(Boolean);

const templates = {
  google: ({ email, from, date }) => {
    const terms = compact([from && `from:(${from})`, 'in:anywhere', date]);
    const account = email ? encode(email).replace('%40', '@') : '0';
    return `https://mail.google.com/mail/u/${account}/#search/${terms.map(encode).join('+')}`;
  },
  microsoft: ({ email }) => `https://outlook.live.com/mail/${email ? `?login_hint=${encode(email)}` : ''}`,
  yahoo: ({ from, date }) => {
    const query = compact([from && `from:${from}`, date]).join(' ');
    // Yahoo expects the keyword double-encoded
    return query
      ? `https://mail.yahoo.com/d/search/keyword=${encode(encode(query))}`
      : 'https://mail.yahoo.com/';
  },
  proton: ({ from, date }) => {
    const params = compact([from && `from=${encode(from)}`, date]).join('&');
    return `https://mail.proton.me/u/0/all-mail${params ? `#${params}` : ''}`;
  },
  icloud: () => 'https://www.icloud.com/mail/',
};

const buildUrl = ({
  email, forceProvider, from, daysAgo, hoursAgo,
} = {}) => {
  const provider = forceProvider || emailToProvider(email);
  if (provider && !templates[provider]) {
    throw Error(`Unknown provider "${provider}". Expected one of: ${Object.keys(templates).join(', ')}`);
  }
  const date = (daysAgo || hoursAgo) ? buildDate(provider, daysAgo, hoursAgo) : null;
  return {
    provider,
    link: provider ? templates[provider]({ email, from, date }) : null,
  };
};

module.exports = buildUrl;
