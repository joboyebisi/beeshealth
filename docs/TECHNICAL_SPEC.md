# BEES Health technical specification

## Current vertical slice
Responsive synthetic-data visit experience plus a tested safety-state module for consent, summary status, clinician confirmation, secure sharing and privacy-preserving reminders.

## Production architecture
Capture client → encrypted upload → time-coded transcription → grounded summary adapter → clinical review queue → immutable summary version → Bee inbox or secure portal → reminder approval. Every transition emits an audit event.

## MedGemma boundary
MedGemma remains one optional versioned adapter. Evaluate representative de-identified cases for factuality, omissions, medication details, readability, bias and clinician edit rate. The model card places downstream validation responsibility on developers; human review remains mandatory.

## Security and regulatory gates
Tenant isolation, managed keys, least privilege, malware scanning, short-lived shares, revocation, retention jobs, access logs, DPIA/threat modelling, BAAs/data-processing agreements and jurisdiction-specific HIPAA/UK GDPR/medical-device review. Alexa notifications contain no clinical detail and require customer permission.
