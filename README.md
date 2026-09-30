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

### Inbox-only providers

These providers are detected, but they have no known search deep link, so the link opens the webmail inbox and `from`, `daysAgo` and `hoursAgo` are ignored. Help confirm them in [issue #12](https://github.com/taitems/sniper-link/issues/12).

| Provider | `forceProvider` | Domains |
| -------- | --------------- | ------- |
| AOL | `aol` | `aol.com`, `aim.com`, `aol.co.uk` |
| Fastmail | `fastmail` | `fastmail.com`, `fastmail.fm` |
| GMX | `gmx` | `gmx.net`, `gmx.de`, `gmx.at`, `gmx.ch`, `gmx.com`, `gmx.us`, `gmx.co.uk`, `gmx.fr`, `gmx.es` |
| WEB.DE | `webde` | `web.de` |
| Zoho Mail | `zoho` | `zoho.com`, `zohomail.com`, `zoho.eu`, `zohomail.eu`, `zohomail.in` |
| Mail.com | `mailcom` | `mail.com`, `email.com`, `usa.com` |
| Orange | `orange` | `orange.fr`, `wanadoo.fr` |
| Free | `free` | `free.fr` |
| La Poste | `laposte` | `laposte.net` |
| WP Poczta | `wp` | `wp.pl` |
| Onet Poczta | `onet` | `onet.pl`, `op.pl`, `onet.eu`, `vp.pl` |
| Interia Poczta | `interia` | `interia.pl`, `interia.eu`, `poczta.fm` |
| Seznam | `seznam` | `seznam.cz`, `email.cz`, `post.cz` |
| Tuta | `tuta` | `tuta.com`, `tuta.io`, `tutanota.com`, `tutanota.de`, `tutamail.com`, `keemail.me` |
| QQ Mail | `qq` | `qq.com`, `vip.qq.com`, `foxmail.com` |
| NetEase | `netease` | `163.com`, `126.com`, `yeah.net` |
| Sina Mail | `sina` | `sina.com`, `sina.cn` |
| Sohu Mail | `sohu` | `sohu.com` |
| Aliyun Mail | `aliyun` | `aliyun.com` |
| Naver Mail | `naver` | `naver.com` |
| Daum / Hanmail | `daum` | `daum.net`, `hanmail.net` |
| Yahoo! Japan | `yahoojapan` | `yahoo.co.jp`, `ymail.ne.jp` |
| Rediffmail | `rediff` | `rediffmail.com` |

## Installation

Using the node package manager of your choice, either

`yarn add sniper-link` or `npm install sniper-link`

## Usage

Subject to change while this script is in an alpha version. Currently it builds three versions:

- A node version in `dist/node/index.js`
- Web esm for React/Svelte etc `dist/web/esm.js`
- Web IIFE for native and legacy js `dist/web/iife.js`, exposed as `window.sniperLink`

### Feature Support Table

|                    | Expects         | Required? | Notes |
| ------------------ | --------------- | --------- | ----- |
| `email`            | String (email)  | ✅ Yes    | User's email inbox to search. |
| `from`             | String          |           | Sender's email address. Can be an email, or partial match.      |
| `forceProvider`    | String ('google', 'yahoo', 'microsoft', 'proton', 'icloud', or any inbox-only provider key) |           | Optional override to skip email provider being detected from the provided string. Useful for when you already know `jessie@company.com` is using G-Suite under the hood, possibly via a MX lookup. |
| `daysAgo`          | Number          |           | Sent within the last 'x' days      |
| `hoursAgo`         | Number          |           | Sent within the last 'y' hours. See note below.       |

- You cannot use a combination of `daysAgo` and `hoursAgo`. If `hoursAgo` are specified, they will be used in preference.
- Gmail's `newer_than:` operator has no hours unit, so `hoursAgo` is sent to Gmail as an `after:<unix timestamp>` filter instead.
- Yes, you could use `forceProvider` to make `lee@yahoo.com` to open `mail.google.com` -- that's on you. An unrecognised `forceProvider` value throws an error.
- Yahoo! Japan (`yahoo.co.jp`) is a separate service from Yahoo Mail, so it is detected as `yahoojapan`, not `yahoo`.

#### Example

A node.js example

```js
const buildUrl = require('sniper-link');

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
//   link: 'https://mail.google.com/mail/?authuser=username@gmail.com#search/from%3A(%40userfront.com)+in%3Aanywhere+newer_than%3A1d'
// }
```

## Roadmap

- Return Android and iOS links with app protocols?
- Add a subject/keyword filter (very low priority)?
- Add search deep links for inbox-only providers once they're confirmed

## Development

Run either `npm run build` or `yarn build` to output to the `dist` folder

## Testing

Run `npm run test` or `yarn test` to run tests via Jest. `--watch` flag supported.

---

## Disclaimer

I am in no way affiliated with the team at [growth.design](https://growth.design), I am merely a fan. All credit goes to Dan Benoni for the idea.
