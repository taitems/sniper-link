/* eslint-disable no-underscore-dangle */
const _getDaysAgo = (num) => new Date().setDate(new Date().getDate() - num);
const _getHoursAgo = (num) => new Date().setHours(new Date().getHours() - num);
const _toUnix = (date) => Math.round(new Date(date).valueOf() / 1000);

// Returns an unencoded search term (google, yahoo) or URL param (proton)
const buildDate = (provider, daysAgo, hoursAgo) => {
  if (provider === 'google') {
    // newer_than only supports d/m/y, so hours use an epoch-seconds after: filter
    return hoursAgo ? `after:${_toUnix(_getHoursAgo(hoursAgo))}` : `newer_than:${daysAgo}d`;
  }
  if (provider === 'yahoo' && daysAgo) {
    const yahooDay = new Date(_getDaysAgo(daysAgo));
    return `after:"${yahooDay.toISOString().substr(0, 10)}"`;
  }
  if (provider === 'proton') {
    const protonSince = hoursAgo
      ? _getHoursAgo(hoursAgo)
      : new Date(_getDaysAgo(daysAgo)).setHours(0, 0, 0, 0);
    return `begin=${_toUnix(protonSince)}`;
  }
  return null;
};

module.exports = buildDate;
