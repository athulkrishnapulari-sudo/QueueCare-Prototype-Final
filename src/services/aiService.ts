import { GoogleGenAI } from '@google/genai';
import { Hospital, Department, Language } from '../types';

export const aiService = {
  async explainHospitalLoad(
    hospital: Hospital,
    department: Department,
    lang: Language = 'en'
  ): Promise<string> {
    try {
      const apiKey = import.meta.env.GEMINI_API_KEY || '';
      if (apiKey) {
        const ai = new GoogleGenAI({ apiKey });
        const prompt = `You are QCare Kerala's digital healthcare queue load assistant.
Hospital: ${hospital.name} (${hospital.district})
Department: ${department.name}
Current token serving: ${department.current_token}
Patients waiting: ${department.people_waiting}
Average wait time: ${department.avg_wait_mins} minutes
Load status: ${department.load_status}

Provide a concise, helpful 2-sentence explanation of why the queue is ${department.load_status} and 1 actionable recommendation for the patient. Respond in ${lang === 'ml' ? 'Malayalam' : 'English'}. Keep the tone professional, calm, and government service focused. Do NOT give medical advice.`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt
        });

        if (response.text) {
          return response.text.trim();
        }
      }
    } catch (e) {
      console.warn('Gemini API call skipped or failed:', e);
    }

    // Fallback static explanation
    if (lang === 'ml') {
      return `${hospital.name} ആശുപത്രിയിലെ ${department.name} വിഭാഗത്തിൽ നിലവിൽ ${department.people_waiting} രോഗികൾ കാത്തിരിക്കുന്നു. ശരാശരി കാത്തിരിപ്പ് സമയം ~${department.avg_wait_mins} മിനിറ്റാണ്. കാത്തിരിപ്പ് സമയം കുറയ്ക്കാൻ തൊട്ടടുത്ത ജനറൽ ആശുപത്രിയിലെ ഒ.പി സമയം കൂടി പരിശോധിക്കാവുന്നതാണ്.`;
    }

    return `${hospital.name} (${department.name}) currently has ${department.people_waiting} patients waiting with an estimated ~${department.avg_wait_mins} min delay. For shorter queue times, consider booking at General Hospital TVM.`;
  },

  async summarizeReport(reportTitle: string, lang: Language = 'en'): Promise<string> {
    if (lang === 'ml') {
      return `${reportTitle} ലബോറട്ടറി പരിശോധനാ ഫലം ഡിജിറ്റലായി ലഭ്യമാണ്. റിപ്പോർട്ടിലെ വിവരങ്ങൾ ഡോക്ടറുടെ പരിശോധനയിൽ കാണിക്കാവുന്നതാണ്. ക്യൂകെയർ പോർട്ടൽ രോഗ നിർണ്ണയം നടത്തുന്നില്ല.`;
    }

    return `${reportTitle} is available digitally. Please present this document during your doctor consultation. QCare Kerala provides health access and does not perform automated medical diagnosis.`;
  }
};
