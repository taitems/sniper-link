![npm](https://img.shields.io/npm/v/sniper-link) ![npm](https://img.shields.io/npm/dm/sniper-link) ![GitHub Sponsors](https://img.shields.io/github/sponsors/taitems)

# sniper-link (under development)

What is a [sniper link](https://growth.design/sniper-link)? Let **growth.design** explain:

> A Sniper Link is a special link that makes it easier for new users to confirm their email after a signup. It typically simulates an inbox search, which minimizes distractions while leading users to the inbox of their email service provider detected on signup.

> With Sniper Links, your new users will only see YOUR confirmation email in their inbox, nothing else. It works even if you landed in their spam.

> This onboarding technique was coined by Dan Benoni in 2019.

### Feature Support Table

|                    | Gmail | Outlook | Yahoo | Proton | iCloud |
| ------------------ | ----- | ------- | ----- | ------ | ------ |
| Account scope      | ✅    | ✅      |       |        |        |
| From filter        | ✅    |         | ✅    | ✅     |        |
| Spam piercer       | ✅    |         | ✅    | ✅     |        |
| Time frame (days)  | ✅    |         | ✅    | ✅     |        |
| Time frame (hours) | ✅    |         |       | ✅     |        |

Legend:

- ✅ = Supported by this provider and the script
- \*️⃣ = Supported by the provider, but not by the script as yet

## Installation

Using the node package manager of your choice, either

`yarn add sniper-link` or `npm install sniper-link`

## Usage

Subject to change while this script is in an alpha version. Currently it builds three versions:

- A node version in `dist/node/index.js`
- Web esm for React/Svelte etc `dist/web/esm.js`
- Web IIFE for native and legacy js `dist/web/iife.js`

### Feature Support Table

|                    | Expects         | Required? | Notes |
| ------------------ | --------------- | --------- | ----- |
| `email`            | String (email)  | ✅ Yes    | User's email inbox to search. |
| `from`             | String          |           | Sender's email address. Can be an email, or partial match.      |
| `forceProvider`    | String ('google', 'yahoo', 'microsoft', 'proton', 'icloud') |           | Optional override to skip email provider being detected from the provided string. Useful for when you already know `jessie@company.com` is using G-Suite under the hood, possibly via a MX lookup. |
| `daysAgo`          | Number          |           | Sent within the last 'x' days      |
| `hoursAgo`         | Number          |           | Sent within the last 'y' hours. See note below.       |

- You cannot use a combination of `daysAgo` and `hoursAgo`. If `hoursAgo` are specified, they will be used in preference.
- Yes, you could use `forceProvider` to make `lee@yahoo.com` to open `mail.google.com` -- that's on you.

#### Example

A node.js example

```js
const buildUrl = require('sniper-link/dist/node');

console.log(
  buildUrl({
    email: 'username@gmail.com',
    from: '@userfront.com',
    daysAgo: 1,
  }),
);

// Logs the following
// {
//   provider: 'google',
//   link: 'https://mail.google.com/mail/u/username@gmail.com/#search/from%3A(@userfront.com)+in%3Aanywhere'
// }
```

## Roadmap

- Return Android and iOS links with app protocols?
- Add a subject/keyword filter (very low priority)?
- Consider more popular [non-western email providers](https://www.quora.com/Who-are-the-top-5-email-providers-in-China-Are-there-any-stats-around-their-marketshare)

## Development

Run either `npm run build` or `yarn build` to output to the `dist` folder

## Testing

Run `npm run test` or `yarn test` to run tests via Jest. `--watch` flag supported.

---

## Disclaimer

I am in no way affiliated with the team at [growth.design](https://growth.design), I am merely a fan. All credit goes to Dan Benoni for the idea.
