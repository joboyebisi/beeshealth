# Setup and credential onboarding

This file defines the order in which BEES Health should become a live system. Provide one item only when its integration is being implemented. Never paste secrets into chat, commit them, or place them in screenshots.

## 1. Source control

Provide:

- The git repository HTTPS or SSH URL.
- The target branch name if it is not `main`.

Authenticate locally with Git Credential Manager, SSH, or `gh auth login`. Do not send a personal access token in chat.

## 2. AWS account and deployment identity

Provide/configure:

- AWS account ID (not secret).
- Deployment region; for a UK-first prototype, choose the intended data-residency region explicitly.
- A local AWS SSO profile or an assumable deployment role with short-lived credentials.

Preferred setup is `aws configure sso` followed by `aws sso login --profile <profile>`. If IAM Identity Center is unavailable, create a tightly scoped deployment role and use a short-lived session. Avoid long-lived IAM user access keys. Do not commit `.aws` files or copy access keys into `.env`.

## 3. Runtime configuration created by infrastructure

These are identifiers, not credentials, and should normally be emitted by the deployment stack:

- API base URL.
- Cognito user-pool ID and app-client ID.
- S3 bucket name for encrypted audio/uploads.
- KMS key ARN.
- CloudWatch log group names.

A Cognito client secret, if one is used for a confidential server client, belongs in AWS Secrets Manager and must never reach the browser.

## 4. Bedrock drafting provider

Provide/configure:

- Approved Bedrock model ID or inference-profile ARN for Claude.
- AWS region where the model is enabled.
- IAM permission for the runtime role to invoke only the selected model/profile.

No separate Claude API key is needed when Claude is invoked through Amazon Bedrock. The app uses its AWS runtime role. Model access must be enabled in the AWS account, and all calls must use synthetic/de-identified text during the hackathon.

## 5. Transcription

Choose and configure one provider:

- Amazon Transcribe/Transcribe Medical through the AWS runtime role, or
- another approved provider with its API secret stored in AWS Secrets Manager.

Required decisions include region, supported specialty/language, speaker labeling, retention, and whether the service terms are acceptable for health data. The browser must not receive provider secrets.

## 6. Database

Provide/configure through infrastructure:

- Aurora PostgreSQL or another selected database endpoint.
- Database name and application username.
- A generated password stored and rotated in AWS Secrets Manager.

Do not send the database password in chat. The deployed runtime role should read the named secret.

## 7. Delivery channel

For email/SMS, configure AWS SES/SNS or another provider. Needed values may include a verified sender/domain, sandbox-production status, and a Secrets Manager ARN for any third-party token. Do not put clinical detail in notification text.

## 8. FHIR/EHR sandbox

Only when implementing EHR integration, provide:

- FHIR base URL and implementation guide/version.
- OAuth issuer/authorization/token URLs.
- Sandbox client ID.
- Private key or client secret through a secure local secret store/Secrets Manager, never chat or git.
- Test patient and encounter identifiers containing no real patient data.

## 9. Observability and demo services

As selected, configure a Sentry DSN or equivalent telemetry destination, analytics project identifier, and a demo-domain/DNS account. Keep sensitive telemetry tokens server-side and ensure logs exclude transcripts, recordings, tokens, and clinical text by default.

## Local environment rules

Copy `.env.example` to `.env` only when local variables are needed. `.env` is ignored. Values marked `*_SECRET_ARN` are references to AWS Secrets Manager, not secret values.
