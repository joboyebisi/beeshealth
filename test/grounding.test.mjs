import test from 'node:test';
import assert from 'node:assert/strict';
import { createClaim, validateGrounding, reviewClaim, publishableSummary } from '../src/grounding.mjs';
import { evaluateSummary, releaseGate } from '../src/evaluation.mjs';
import { toPatientInstructionDocument } from '../src/fhir.mjs';

test('clinical claims carry valid transcript evidence and human review', () => {
  const claim = createClaim({ type: 'medication', text: 'Take one tablet daily', evidence: [{ start: 4, end: 20 }], confidence: 0.93 });
  assert.equal(validateGrounding(claim, 100).valid, true);
  assert.equal(publishableSummary([claim]), false);
  const reviewed = reviewClaim(claim, { clinicianId: 'dr-1', decision: 'approve' });
  assert.equal(publishableSummary([reviewed]), true);
});

test('unsupported and omitted content are measurable', () => {
  const result = evaluateSummary(['take medicine', 'follow up monday'], ['take medicine', 'call friday']);
  assert.equal(result.precision, 0.5);
  assert.deepEqual(result.unsupported, ['call friday']);
  assert.equal(releaseGate({ factuality: 0.96, criticalOmissionRate: 0, clinicianApprovalRate: 1, consentFailures: 0 }).pass, true);
});

test('FHIR document rejects unconfirmed details and escapes text', () => {
  const claim = reviewClaim(createClaim({ type: 'follow-up', text: 'Call <clinic>', evidence: [{ start: 0, end: 5 }], confidence: 0.9 }), { clinicianId: 'dr-1', decision: 'approve' });
  const bundle = toPatientInstructionDocument({ patientReference: 'Patient/1', encounterReference: 'Encounter/1', claims: [claim] });
  assert.match(bundle.entry[0].resource.section[0].text.div, /&lt;clinic&gt;/);
});
