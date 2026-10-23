# BEES Health platform architecture

## Surfaces

- **Clinician web app:** encounter setup, consent witness, live recording state, evidence-linked review, corrections and approval.
- **Patient mobile app:** consent, live recording indicator, confirmed summary, questions, secure sharing and reminder approval.
- **Bee/Bee Eclipse wearable:** capture control and visible/haptic recording state; encrypted upload after a consent token is issued.
- **Patient web link:** accessible, expiring experience for non-Bee patients.
- **Alexa reminders:** optional low-sensitivity prompt only; the user opens the authenticated app for clinical detail.
- **MCP integration service:** narrow, audited tools for approved EHR/portal workflows. It does not expose raw recordings to general agents.
- **Fire TV:** no launch role.

## AWS deployment

Cognito/enterprise SSO, API Gateway, Lambda/ECS, S3 with KMS, Aurora PostgreSQL, Step Functions, Transcribe Medical where suitable, Bedrock/model endpoint adapters, CloudTrail and CloudWatch. Region, retention and business-associate terms must be selected per customer and jurisdiction. Raw recordings have a documented deletion policy and are not training data by default.

FHIR export is an adapter after clinician approval; production profiles and EHR write-back require implementation-guide validation and customer authorization.
