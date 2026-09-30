const providers = {
  google: /^(gmail|googlemail|google)\.com$/,
  // Regional Yahoo domains, excluding yahoo.co.jp (Yahoo! Japan is a separate service)
  yahoo: /^(yahoo\.(com(\.[a-z]{2})?|co\.(?!jp$)[a-z]{2}|[a-z]{2})|ymail\.com|rocketmail\.com)$/,
  microsoft: /^((outlook|live|hotmail)\.((com|co)\.)?[a-z]{2,3}|msn\.com|passport\.(com|net))$/,
  proton: /^(proton\.me|protonmail\.(com|ch)|pm\.me)$/,
  icloud: /^(icloud|me|mac)\.com$/,
};

const emailToProvider = (email) => {
  if (!email) {
    throw Error('No email provided');
  }
  if (!email.includes('@')) {
    return null;
  }
  const domain = email.split('@').pop().trim().toLowerCase();
  const match = Object.keys(providers).find((provider) => providers[provider].test(domain));
  return match || null;
};

module.exports = emailToProvider;
