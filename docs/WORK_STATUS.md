# BEES Health work status

Last updated: 2026-10-23 (Europe/London)

## Current milestone

Prepare the first major BEES Health app for repeatable end-to-end testing, a credible hackathon demo, and staged connection to real services.

## What exists

- Responsive patient/marketing journey in `public/index.html`.
- Multi-view clinic demo in `public/clinic.html`.
- Safety-domain modules for dual consent, grounding, clinician confirmation, secure sharing, reminders, FHIR document generation, model routing, and release evaluation.
- Node unit tests in `test/`.
- A minimal static Node server on port 4203.
- Playwright end-to-end tests and device projects for desktop Chromium, an iPhone-sized Safari engine, and an Android-sized Chromium browser.

## Honest integration status

The current UI and its data are synthetic. The project does **not yet** have a live API, persistent database, authentication, audio capture/upload, transcription, Bedrock invocation, email/SMS delivery, EHR connection, or AWS deployment. The safety logic is executable and tested, but the browser demo currently simulates those actions in the client.

## Verification commands

```powershell
npm test
npm run test:e2e
```

Use `npm run test:e2e:headed` for a visible desktop/device simulation and `npm run test:e2e:report` to open the last HTML report.

Last verified on 2026-10-23:

- `npm test`: 11/11 passed.
- `npm run test:e2e`: 12/12 passed (desktop Chromium, iPhone/WebKit, and Android-sized Chromium).
- The E2E runner starts and stops the local server automatically on Windows.

## End-to-end journeys covered

- Landing-page dual consent blocks recording until both people agree.
- A clinician can confirm a consented draft and prepare secure sharing.
- The clinic workflow requires consent before capture.
- The review workflow requires all clinical details to be checked before confirmation.
- The patient workflow can prepare secure delivery and approve a reminder.
- Main pages load without uncaught browser errors at desktop and mobile viewport sizes.

## Next action

Push the tested baseline to `https://github.com/joboyebisi/beeshealth.git` on `main`. The remote was verified empty on 2026-10-23, so there is no existing history to reconcile. Then begin the first real vertical slice: AWS identity/deployment foundation plus a small authenticated API and health check.

## Credential onboarding order

Follow `docs/SETUP_AND_CREDENTIALS.md`. Ask for one integration at a time. Source control is now identified; the next item is an AWS account/region plus an AWS SSO profile or short-lived role session. Do not request or store a long-lived AWS access key unless there is no viable role/SSO path.

## Decisions and constraints

- Browser/device emulation is the simulator for this responsive web app; native mobile simulators are unnecessary until there is a native app.
- Claude on Amazon Bedrock is a candidate drafting provider, never the clinical authority.
- A model may draft only grounded claims. A clinician confirmation remains the release gate.
- Synthetic/de-identified data only until security, privacy, retention, and regulatory controls are implemented and reviewed.
- No secrets in git. Local `.env` files and Playwright artifacts are ignored.

## Known issues / backlog

- Several source files contain mojibake characters (for example smart punctuation rendered as `â...`); fix before recording the final demo.
- The server has no API routes or production security headers.
- Browser actions are currently UI simulations and do not persist.
- A hackathon state/checklist has not been initialized in this folder.
- GitHub CLI's saved `joboyebisi` token was reported invalid on 2026-10-23. A normal Git push may still use Git Credential Manager; otherwise reauthenticate with `gh auth login` without sharing a token in chat.

## Latest implementation note

The first simulator run exposed an iPhone-only interaction defect: the invisible toast element could cover and intercept the clinician confirmation control. Toasts now ignore pointer events on both app surfaces. The review-checkbox test also now performs the three checks sequentially, matching real user behavior.
