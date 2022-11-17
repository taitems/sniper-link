![npm](https://img.shields.io/npm/v/sniper-link) ![npm](https://img.shields.io/npm/dm/sniper-link) ![GitHub Sponsors](https://img.shields.io/github/sponsors/taitems)

# sniper-link (under development)

What is a [sniper link](https://growth.design/sniper-link)? Let **growth.design** explain:

> A Sniper Link is a special link that makes it easier for new users to confirm their email after a signup. It typically simulates an inbox search, which minimizes distractions while leading users to the inbox of their email service provider detected on signup.

>With Sniper Links, your new users will only see YOUR confirmation email in their inbox, nothing else. It works even if you landed in their spam.

> This onboarding technique was coined by Dan Benoni in 2019.

### Feature Support Table

|               | Gmail | Outlook | Yahoo | Proton | iCloud |
|---------------|-------|---------|-------|--------|--------|
| Account scope | ✅    | ✅       |       |        |        |
| From filter   | ✅    |         | ✅     | ✅       |        |
| Spam piercer  | ✅    |         | ✅     | ✅       |        |
| Time frame (days)   | *️⃣    |         | *️⃣     | ✅       |        |
| Time frame (hours)   | *️⃣    |         |       | *️⃣       |        |

Legend:

- *️⃣ = Supported by the provider, but not by the script as yet

## Installation

Using the node package manager of your choice, either

`yarn add sniper-link` or `npm install sniper-link`

## Usage

Subject to change while this script is in an alpha version. Currently it builds three versions:

- A node version in `dist/node/index.js`
- Web esm for React/Svelte etc `dist/web/esm.js`
- Web IIFE for native and legacy js `dist/web/iife.js`

## Development
Run either `npm run build` or `yarn build` to output to the `dist` folder

## Testing
Run `npm run test` or `yarn test` to run tests via Jest. `--watch` flag supported.

## Roadmap
- Support passing in the provider (eg: `google`) when a preflight check is done outside of this script and the engineer knows that `user@company.com` is using G-Suite, and should be sent to `gmail.com`
- Return Android and iOS links with app protocols
- An optional override to support `1h` window which would only work in Gmail and Proton, perhaps falling back to `1d` when not supported?
- Add a subject/keyword filter (very low priority)

-----

## Disclaimer

I am in no way affiliated with the team at [growth.design](https://growth.design), I am merely a fan. All credit goes to Dan Benoni for the idea.
