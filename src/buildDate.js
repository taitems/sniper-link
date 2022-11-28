/* eslint-disable no-underscore-dangle */
const _getDaysAgo = (num) => new Date().setDate(new Date().getDate() - num);
const _getHoursAgo = (num) => new Date().setHours(new Date().getHours() - num);

const buildDate = (provider, daysAgo, hoursAgo) => {
  if (provider === 'google') {
    return hoursAgo ? `+newer_than:${hoursAgo}h` : `+newer_than:${daysAgo}d`;
  }
  if (provider === 'yahoo' && daysAgo) {
    const yahooDay = new Date(_getDaysAgo(daysAgo));
    return ` after:"${yahooDay.toISOString().substr(0, 10)}"`;
  }
  if (provider === 'proton') {
    const protonSince = hoursAgo
      ? new Date(_getHoursAgo(hoursAgo))
      : new Date(_getDaysAgo(daysAgo)).setHours(0, 0, 0, 0);
    const protonDatestamp = Math.round(protonSince.valueOf() / 1000);
    return `&begin=${protonDatestamp}`;
  }
  return null;
};

module.exports = buildDate;
