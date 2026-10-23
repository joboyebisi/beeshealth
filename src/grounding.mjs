import crypto from 'node:crypto';

const CRITICAL = new Set(['medication', 'diagnosis', 'follow-up', 'red-flag']);

export function createClaim({ type, text, evidence = [], confidence = 0 }) {
  if (!type || !text) throw new Error('Claim type and text required');
  return { id: crypto.randomUUID(), type, text, evidence, confidence, status: 'draft' };
}

export function validateGrounding(claim, transcriptLength) {
  const evidenceValid = claim.evidence.length > 0 && claim.evidence.every(e => Number.isInteger(e.start) && Number.isInteger(e.end) && e.start >= 0 && e.end > e.start && e.end <= transcriptLength);
  return {
    valid: evidenceValid && claim.confidence >= 0.7,
    requiresClinicianReview: CRITICAL.has(claim.type) || !evidenceValid || claim.confidence < 0.9,
    reasons: [!evidenceValid && 'missing-or-invalid-evidence', claim.confidence < 0.7 && 'low-confidence'].filter(Boolean)
  };
}

export function reviewClaim(claim, { clinicianId, decision, correctedText }) {
  if (!clinicianId || !['approve', 'correct', 'reject'].includes(decision)) throw new Error('Valid clinician review required');
  if (decision === 'correct' && !correctedText) throw new Error('Correction text required');
  return {
    ...claim,
    text: decision === 'correct' ? correctedText : claim.text,
    status: decision === 'reject' ? 'rejected' : 'confirmed',
    review: { clinicianId, decision, reviewedAt: new Date().toISOString() }
  };
}

export function publishableSummary(claims) {
  const active = claims.filter(c => c.status !== 'rejected');
  return active.length > 0 && active.every(c => c.status === 'confirmed');
}
