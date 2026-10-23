const NEXT={scheduled:['consent'],consent:['capturing'],capturing:['processing'],processing:['clinician-review'],'clinician-review':['patient-share'],'patient-share':['reminders','follow-up'],reminders:['follow-up']};
export function advanceVisit(visit,next,evidence={}){
  if(!NEXT[visit.stage]?.includes(next))throw Error(`Invalid visit transition: ${visit.stage} -> ${next}`);
  if(next==='capturing'&&!(evidence.patientConsent&&evidence.clinicianConsent))throw Error('Dual consent required');
  if(next==='patient-share'&&!evidence.clinicianConfirmed)throw Error('Clinician confirmation required');
  if(next==='reminders'&&!evidence.patientApproved)throw Error('Patient approval required');
  return{...visit,stage:next,audit:[...(visit.audit||[]),{event:next,actor:evidence.actor||'system'}]};
}
export function patientDelivery({hasBeeAccount,emailOrPhone}){
  if(hasBeeAccount)return{channel:'bee-app',recipientBound:true,revocable:true};
  if(!emailOrPhone)throw Error('Recipient contact required');
  return{channel:'secure-link',recipientBound:true,singleUse:true,revocable:true};
}

