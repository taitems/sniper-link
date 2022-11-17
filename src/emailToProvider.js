const emailToProvider = (email) => {
  if (!email) {
    throw Error('No email provided');
  } else if (email.match(/@(gmail|googlemail|google).com/)) {
    return 'google';
  } else if (email.match(/@yahoo.(com|co.uk|fr|it)/) || email.match(/@(ymail|rocketmail).com/)) {
    return 'yahoo';
  } else if (email.match(/@(outlook|live|hotmail|msn|passport).com/) || email.match('@passport.net')) {
    return 'microsoft';
  } else if (email.match('@proton.me') || email.match('@protonmail.com')) {
    return 'proton';
  } else if (email.match('@icloud.com')) {
    return 'icloud';
  } else {
    return null;
  }
};

module.exports = emailToProvider;
