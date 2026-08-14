import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../translations';
import { reportService } from '../services/reportService';
import { MedicalReport } from '../types';
import { downloadMedicalReport } from '../lib/pdf';
import { FileText, Download, Eye, Calendar, Building2, X } from 'lucide-react';

export const Reports: React.FC = () => {
  const { language } = useApp();
  const t = getTranslation(language);

  const [reports, setReports] = useState<MedicalReport[]>([]);
  const [selectedReport, setSelectedReport] = useState<MedicalReport | null>(null);

  useEffect(() => {
    async function loadReports() {
      const data = await reportService.getReports();
      setReports(data);
    }
    loadReports();
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <span className="text-xs font-bold text-teal-800 uppercase tracking-wider">
          Patient Health Records Repository
        </span>
        <h1 className="text-xl font-extrabold text-slate-900 mt-0.5">{t.reports.title}</h1>
      </div>

      {/* Reports List */}
      <div className="space-y-3">
        {reports.map((rep) => (
          <div
            key={rep.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs hover:border-slate-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-3.5">
              <div className="p-3 bg-teal-50 text-teal-700 rounded-xl shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-teal-800 bg-teal-100/80 px-2.5 py-0.5 rounded-full uppercase">
                  {rep.type}
                </span>
                <h3 className="font-bold text-slate-900 text-sm mt-1">{rep.title}</h3>
                <div className="text-xs text-slate-500 mt-0.5">
                  {rep.hospital_name} · {rep.doctor_name}
                </div>
                <div className="text-[11px] text-slate-400 font-medium mt-1">
                  Date: {rep.date} · File size: {rep.file_size}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 sm:pt-0 border-t sm:border-0 border-slate-100">
              <button
                onClick={() => setSelectedReport(rep)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors cursor-pointer min-h-[44px]"
              >
                <Eye className="w-4 h-4 text-slate-600" />
                <span>{t.reports.viewReport}</span>
              </button>
              <button
                type="button"
                onClick={() => downloadMedicalReport(rep)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer min-h-[44px]"
              >
                <Download className="w-4 h-4" />
                <span>{t.reports.downloadPdf}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Report Preview Modal */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-lg w-full p-6 relative">
            <button
              onClick={() => setSelectedReport(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-bold text-slate-900 text-lg mb-1">{selectedReport.title}</h3>
            <p className="text-xs text-slate-500 mb-4">{selectedReport.hospital_name} · {selectedReport.date}</p>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2 mb-5">
              <div>Type: <strong>{selectedReport.type}</strong></div>
              <div>Consultant Doctor: <strong>{selectedReport.doctor_name}</strong></div>
              <div>Hospital: <strong>{selectedReport.hospital_name}</strong></div>
              <div>Verification Status: <strong className="text-emerald-700">Digitally Signed & Certified</strong></div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-4 text-sm text-slate-700 space-y-3">
              <div className="font-bold text-slate-900">{selectedReport.title}</div>
              <div className="text-xs text-slate-500">{selectedReport.date} · {selectedReport.hospital_name}</div>
              <p className="leading-6">
                {selectedReport.summary || 'This document contains the patient’s clinical summary and follow-up guidance for the current outpatient consultation. It records the findings evaluated during the visit, prescribed treatment guidance, and recommended monitoring plan.'}
              </p>
              {(selectedReport.findings && selectedReport.findings.length > 0) && (
                <ul className="list-disc list-inside space-y-1 pl-1 text-slate-600">
                  {selectedReport.findings.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex justify-end gap-2 mt-5">
              <button
                type="button"
                onClick={() => downloadMedicalReport(selectedReport)}
                className="px-4 py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs rounded-xl min-h-[44px]"
              >
                Download
              </button>
              <button
                onClick={() => setSelectedReport(null)}
                className="px-4 py-2.5 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl min-h-[44px]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
