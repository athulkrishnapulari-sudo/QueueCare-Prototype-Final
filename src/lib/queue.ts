import { Hospital, Doctor, LoadStatus, SmartSuggestion } from '../types';

/**
 * Calculates hospital load score (0 to 100) and load classification.
 */
export function calculateHospitalLoadScore(
  peopleWaitingTotal: number,
  avgWaitMins: number,
  capacityRatio: number
): { score: number; status: LoadStatus } {
  const score = Math.min(100, Math.round(peopleWaitingTotal * 2.5 + avgWaitMins * 0.5 + capacityRatio * 30));

  let status: LoadStatus = 'Low';
  if (score > 70) {
    status = 'High';
  } else if (score > 30) {
    status = 'Moderate';
  }

  return { score, status };
}

/**
 * Smart Hospital Load Balancer Recommendation Engine.
 * Analyzes the user's selected hospital vs other hospitals in the same district/vicinity.
 * If selected hospital load is High (>70) or wait time > 60m, and another hospital has significantly lower wait time (>30m savings),
 * returns a smart load balancing suggestion.
 */
export function calculateSmartHospitalSuggestion(
  selectedHospital: Hospital,
  selectedWaitMins: number,
  allHospitals: Hospital[]
): SmartSuggestion | null {
  if (selectedHospital.load_score <= 60 && selectedWaitMins <= 45) {
    return null; // Selected hospital load is acceptable
  }

  // Find alternative hospital in the same district or nearby with low/moderate load
  const alternatives = allHospitals
    .filter((h) => h.id !== selectedHospital.id && h.district === selectedHospital.district)
    .sort((a, b) => a.load_score - b.load_score);

  if (alternatives.length === 0) return null;

  const bestAlternative = alternatives[0];
  // Estimate wait time for best alternative based on load score
  const altWaitMins = Math.max(15, Math.round(bestAlternative.load_score * 0.7));

  if (selectedWaitMins - altWaitMins >= 25) {
    return {
      suggestedHospitalId: bestAlternative.id,
      suggestedHospitalName: bestAlternative.name,
      estimatedWaitSelectedMins: selectedWaitMins,
      estimatedWaitSuggestedMins: altWaitMins,
      reason: `The selected department at ${selectedHospital.name} currently has a high waiting load (~${selectedWaitMins}m wait). ${bestAlternative.name} has a lower current waiting load (~${altWaitMins}m wait).`
    };
  }

  return null;
}

/**
 * Recommends the best doctor based on lower appointment count & earlier open slot.
 */
export function recommendDoctor(doctors: Doctor[]): Doctor | null {
  if (doctors.length <= 1) return doctors[0] || null;

  // Sort by booked count ascending and available today
  const available = doctors.filter((d) => d.is_available_today);
  if (available.length === 0) return doctors[0];

  const sorted = [...available].sort((a, b) => a.booked_appointments_count - b.booked_appointments_count);

  return sorted[0];
}
