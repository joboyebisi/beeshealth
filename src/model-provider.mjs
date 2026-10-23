export function chooseDraftProvider({clinicalModelAvailable,generalModelAvailable}){
  if(clinicalModelAvailable)return{provider:'clinical-domain',role:'draft-only',requiresGrounding:true,requiresHumanReview:true};
  if(generalModelAvailable)return{provider:'general',role:'draft-only',requiresGrounding:true,requiresHumanReview:true};
  return{provider:'rules-fallback',role:'extract-only',requiresGrounding:true,requiresHumanReview:true};
}
export function releaseDecision({allClaimsGrounded,medicationsExact,clinicianConfirmed}){
  return{releasable:Boolean(allClaimsGrounded&&medicationsExact&&clinicianConfirmed),failed:[!allClaimsGrounded&&'grounding',!medicationsExact&&'medication',!clinicianConfirmed&&'confirmation'].filter(Boolean)};
}

