const buildDate = (provider, daysAgo) => {
  if (provider === 'google') {
    return `+newer_than:${daysAgo}d`;
  } if (provider === 'yahoo') {
    const yahooDay = new Date(new Date().setDate(new Date().getDate() - daysAgo));
    return ` after:"${yahooDay.toISOString().substr(0, 10)}"`;
  } if (provider === 'proton') {
    const protonDay = new Date(
      new Date().setDate(new Date().getDate() - daysAgo),
    ).setHours(0, 0, 0, 0);
    const protonDatestamp = Math.round(protonDay.valueOf() / 1000);
    return `&begin=${protonDatestamp}`;
  }
  return null;
};

module.exports = buildDate;
