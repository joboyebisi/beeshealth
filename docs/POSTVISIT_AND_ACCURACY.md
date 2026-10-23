# PostVisit research and BEES accuracy design

PostVisit.ai describes itself as an AI-powered post-visit companion that helps patients understand, remember and follow through on a clinician's recommendations, with separate patient and doctor experiences and an explicit warning that it does not replace professional judgment. That validates BEES's “reverse scribe” direction; it does not validate copying the product or assuming access to its internals.

## BEES differentiator

- capture can start from the clinician's Bee Eclipse or the patient's Bee, but both parties see recording state and can pause/withdraw;
- every medication, diagnosis, follow-up and red-flag claim links to transcript evidence;
- the clinician reviews critical facts before patient publication;
- the patient sees plain language, questions to ask, pending results and named next steps;
- reminders can only be created from confirmed instructions and require patient approval;
- non-Bee patients receive a revocable, expiring secure link rather than an attachment containing health data.

## Accuracy pipeline

Audio → diarized transcript → structured candidate claims → terminology/medication normalization → evidence-span validator → contradiction/omission checks → clinician correction/approval → patient-language transformation → confirmed summary.

Models do not directly publish. MedGemma is an optional candidate for extraction/normalization and must be evaluated against the same blinded test set as a general model. Selection is based on factuality, critical omission rate, subgroup performance, latency and deployment/privacy constraints—not the word “medical” in a model description.

## Evaluation

- gold set authored by clinicians from consented/de-identified encounters;
- claim-level precision/recall plus unsupported-claim and critical-omission counts;
- medication name/dose/route/frequency exactness;
- human comprehension and actionability testing;
- failure slices for accents, noisy rooms, interpreters, paediatrics and multi-speaker visits;
- zero tolerance for recording without valid consent in release gating.
