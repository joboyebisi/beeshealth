export function toPatientInstructionDocument({ patientReference, encounterReference, claims, authoredAt }) {
  if (!claims.every(c => c.status === 'confirmed')) throw new Error('Only confirmed claims can be exported');
  return {
    resourceType: 'Bundle', type: 'document', timestamp: authoredAt || new Date().toISOString(),
    entry: [{ resource: {
      resourceType: 'Composition', status: 'final', type: { text: 'Patient visit instructions' },
      subject: { reference: patientReference }, encounter: { reference: encounterReference },
      date: authoredAt || new Date().toISOString(), title: 'BEES Health visit summary',
      section: [{ title: 'Confirmed instructions', text: { status: 'generated', div: `<div>${claims.map(c => escapeHtml(c.text)).join('<br/>')}</div>` } }]
    }}]
  };
}

function escapeHtml(value) { return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;'); }
