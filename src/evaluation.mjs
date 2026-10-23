export function evaluateSummary(referenceClaims, predictedClaims) {
  const ref = new Set(referenceClaims.map(normalize));
  const pred = new Set(predictedClaims.map(normalize));
  const truePositive = [...pred].filter(x => ref.has(x)).length;
  const precision = pred.size ? truePositive / pred.size : 0;
  const recall = ref.size ? truePositive / ref.size : 0;
  return {
    precision, recall,
    f1: precision + recall ? 2 * precision * recall / (precision + recall) : 0,
    unsupported: [...pred].filter(x => !ref.has(x)),
    omitted: [...ref].filter(x => !pred.has(x))
  };
}

function normalize(value) { return value.toLowerCase().replace(/\s+/g, ' ').trim(); }

export function releaseGate({ factuality, criticalOmissionRate, clinicianApprovalRate, consentFailures }) {
  const failures = [];
  if (factuality < 0.95) failures.push('factuality');
  if (criticalOmissionRate > 0.01) failures.push('critical-omissions');
  if (clinicianApprovalRate < 0.98) failures.push('clinician-approval');
  if (consentFailures > 0) failures.push('consent');
  return { pass: failures.length === 0, failures };
}
