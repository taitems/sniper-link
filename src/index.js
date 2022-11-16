const buildUrl = require('./buildUrl');

const sniperLink = ({
  email,
  from,
}) => buildUrl({ email, from });

module.exports = sniperLink;
