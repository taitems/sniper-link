const buildDate = require('./buildDate');
const emailToProvider = require('./emailToProvider');

const templates = {
  google:
    'https://mail.google.com/mail/u/{USER_EMAIL}/#search/from%3A({FROM_EMAIL})+in%3Aanywhere{DATE}',
  microsoft: 'https://outlook.live.com/mail/?login_hint={USER_EMAIL}',
  yahoo: 'https://mail.yahoo.com/d/search/keyword=from%253A{FROM_EMAIL}{DATE}',
  proton: 'https://mail.proton.me/u/0/all-mail#from={FROM_EMAIL}{DATE}',
  icloud: 'https://www.icloud.com/mail/',
};

const buildUrl = ({
  email, forceProvider, from, daysAgo, hoursAgo,
}) => {
  const provider = forceProvider || emailToProvider(email);
  const dateString = (daysAgo || hoursAgo) && buildDate(provider, daysAgo, hoursAgo);
  const link = provider
    ? templates[provider]
      .replace('{USER_EMAIL}', email)
      .replace('{FROM_EMAIL}', from)
      .replace('{DATE}', dateString || '')
    : null;
  return {
    provider,
    link,
  };
};

module.exports = buildUrl;
