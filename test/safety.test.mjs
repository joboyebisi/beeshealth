import test from'node:test';import assert from'node:assert/strict';import{recordingState,draftVisit,confirmVisit,shareVisit,reminderDraft}from'../src/safety.mjs';const t='Synthetic consultation transcript';
test('both consents are required',()=>assert.equal(recordingState({patientConsent:{agreedAt:1},clinicianConsent:{},purpose:'visit-summary'}).canRecord,false));
test('withdrawal always stops recording',()=>assert.equal(recordingState({patientConsent:{agreedAt:1},clinicianConsent:{agreedAt:1},purpose:'visit-summary',withdrawn:true}).status,'stopped'));
test('draft cannot be shared',()=>assert.throws(()=>shareVisit(draftVisit({transcript:t}),{recipient:'p'})));
test('confirmed summary creates revocable share',()=>assert.equal(shareVisit(confirmVisit(draftVisit({transcript:t}),'dr-1'),{recipient:'p'}).revocable,true));
test('reminder hides clinical details from notification',()=>assert.doesNotMatch(reminderDraft(confirmVisit(draftVisit({transcript:t}),'dr-1')).notificationText,/antibiotic/i));
