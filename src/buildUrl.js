const emailToProvider = require("./emailToProvider");

const templates = {
    // todo: add date
    // "google": 'https://mail.google.com/mail/u/{USER_EMAIL}/#search/from%3A({FROM_EMAIL})+in%3Aanywhere+newer_than%3A1h',
    "google": 'https://mail.google.com/mail/u/{USER_EMAIL}/#search/from%3A({FROM_EMAIL})+in%3Aanywhere',
    "microsoft": 'https://outlook.live.com/mail/?login_hint={USER_EMAIL}',
    "yahoo": 'https://mail.yahoo.com/d/search/keyword=from%253A{FROM_EMAIL}',
    "proton": 'https://mail.proton.me/u/0/all-mail#from={FROM_EMAIL}',
    "icloud": 'https://www.icloud.com/mail/',
}



const buildUrl = ({ email, from }) => {
    const provider = emailToProvider(email);
    const link = templates[provider]
        .replace('{USER_EMAIL}', encodeURIComponent(email))
        .replace('{FROM_EMAIL}', encodeURIComponent(from));
    return {
        provider,
        link
    };
}

module.exports = buildUrl;