# BEES Health connected care experience

## One accountable journey

`Scheduled visit → dual consent → capture → transcript → grounded draft → clinician review → accessible patient delivery → patient-approved reminders → follow-up`

Bee Eclipse, clinician web, patient mobile/web and Alexa reminders are surfaces over this one audited visit record. No surface can skip the release gates.

## Clinician and patient flow

1. Appointment is matched to the correct patient and clinician; accessibility and delivery preferences are shown before capture.
2. Patient and clinician receive the same purpose, retention, pause/stop and withdrawal explanation. Capture starts only after both consent.
3. Speaker-labelled transcription keeps timestamps. Capture can stop immediately and writes an audit event.
4. The drafting pipeline extracts overview, medicines, follow-up, red flags and unanswered questions. Every clinical claim links to a transcript span or approved clinic source.
5. A clinician checks exact medicine/dose/frequency, action timing and safety wording. Edits preserve original, editor and reason.
6. Only a clinician-confirmed version is released. Bee patients receive it in-app; non-Bee patients receive a short-lived, recipient-bound, revocable link.
7. The patient chooses text size, audio/translation-ready view and explicitly approves each reminder.
8. Follow-up questions are limited to the confirmed summary and approved resources. New/worsening symptoms route to a clinic-approved pathway or urgent-care guidance rather than diagnosis.

## Model architecture

MedGemma is an optional evaluated drafting provider, not the product’s authority. The provider router can use clinical-domain, general or rules-based extraction while preserving the same grounding, schema and human-release gates. Evaluation covers claim support, medication exactness, omissions, red flags, readability, demographic slices and clinician edit rate.

## Safety and security

- Role-based access, tenant isolation, encryption, least privilege and tamper-evident audit events.
- No recording before dual consent and no use beyond the stated purpose.
- Configurable deletion with the shortest clinically and legally acceptable retention.
- No unconfirmed content in patient reminders.
- Identity-bound link delivery and revocation for non-account patients.
- FHIR export only after confirmation; source provenance is retained.
- Synthetic data only in demos and tests.

## Product boundary

BEES supports understanding and follow-through; it does not diagnose, prescribe, replace emergency services or silently alter the clinical record. Production rollout requires clinical safety ownership, DPIA/security assessment, local regulatory analysis, incident response and site-specific validation.

