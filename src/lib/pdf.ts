import { Appointment, MedicalReport } from '../types';

export function buildDigitalOPTicketHtml(appointment: Appointment) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>QCare Kerala - Digital OP Ticket #${appointment.booking_reference}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 24px; color: #0f172a; background: #fff; }
          .header { border-bottom: 2px solid #0f766e; padding-bottom: 12px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center; }
          .title { font-size: 22px; font-weight: 800; color: #0f766e; }
          .tag { font-size: 11px; color: #64748b; text-transform: uppercase; letter-spacing: 0.08em; }
          .token-box { background: #f0fdf4; border: 2px dashed #16a34a; border-radius: 10px; padding: 18px; text-align: center; margin: 18px 0; }
          .label { font-size: 11px; color: #64748b; text-transform: uppercase; letter-spacing: 0.08em; }
          .token-num { font-size: 38px; font-weight: 900; letter-spacing: 1px; color: #15803d; }
          .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 18px; }
          .cell { padding: 10px; border-radius: 8px; background: #f8fafc; }
          .cell .text { font-weight: 700; margin-top: 4px; }
          .footer { margin-top: 26px; border-top: 1px solid #e2e8f0; padding-top: 12px; color: #475569; font-size: 12px; text-align: center; }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <div class="tag">Health & Family Welfare Dept · Govt of Kerala</div>
            <div class="title">QCare Kerala Digital OP Ticket</div>
          </div>
          <div style="font-size: 12px; font-weight: 700; color: #334155;">Ref: ${appointment.booking_reference}</div>
        </div>

        <div class="token-box">
          <div class="label">Assigned OP Token Number</div>
          <div class="token-num">${appointment.token_number}</div>
          <div style="margin-top: 8px; font-size: 14px; font-weight: 700; color: #166534;">
            Registration Fee Paid: ₹${appointment.fee_paid.toFixed(2)} (${appointment.payment_method})
          </div>
        </div>

        <div class="grid">
          <div class="cell">
            <div class="label">Patient Name</div>
            <div class="text">${appointment.patient_name} (${appointment.patient_relationship})</div>
          </div>
          <div class="cell">
            <div class="label">UHID</div>
            <div class="text">${appointment.patient_uhid}</div>
          </div>
          <div class="cell">
            <div class="label">Hospital Name</div>
            <div class="text">${appointment.hospital_name}</div>
          </div>
          <div class="cell">
            <div class="label">Department</div>
            <div class="text">${appointment.department_name}</div>
          </div>
          <div class="cell">
            <div class="label">Doctor Assigned</div>
            <div class="text">${appointment.doctor_name}</div>
          </div>
          <div class="cell">
            <div class="label">Date & Time</div>
            <div class="text">${appointment.appointment_date} · ${appointment.appointment_time}</div>
          </div>
        </div>

        <div class="footer">
          Please present this digital token or booking reference at the hospital OP counter. Emergency Helpline: 104 / DISHA 1056.
        </div>
      </body>
    </html>
  `;
}

export function downloadDigitalOPTicket(appointment: Appointment) {
  const html = buildDigitalOPTicketHtml(appointment);
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `QCare-OP-Ticket-${appointment.booking_reference}.html`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export function printDigitalOPTicket(appointment: Appointment) {
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Please allow popups to print/download your Digital OP Ticket.');
    return;
  }

  const html = buildDigitalOPTicketHtml(appointment);
  printWindow.document.write(html);
  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => printWindow.print(), 250);
}

export function buildMedicalReportHtml(report: MedicalReport) {
  const findings = (report.findings && report.findings.length > 0
    ? report.findings
    : [
        'Patient reviewed in outpatient consultation and advised routine follow-up as clinically indicated.',
        'No acute emergency signs were identified during the current review.',
        'Medication adherence and hydration were advised for continued improvement.'
      ]).map((item) => `<li>${item}</li>`).join('');

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${report.title}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 22px; color: #0f172a; background: #ffffff; }
          .header { border-bottom: 2px solid #0f766e; padding-bottom: 12px; margin-bottom: 20px; }
          .title { font-size: 24px; font-weight: 800; color: #0f766e; }
          .meta { color: #475569; font-size: 13px; margin-top: 8px; }
          .card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 16px; margin-top: 18px; }
          .label { color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; }
          .value { font-size: 16px; font-weight: 700; margin-top: 4px; }
          ul { margin: 12px 0 0 18px; color: #334155; }
          li { margin-bottom: 8px; }
          .footer { margin-top: 24px; border-top: 1px solid #e2e8f0; padding-top: 12px; font-size: 12px; color: #475569; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="title">${report.title}</div>
          <div class="meta">${report.type} · ${report.date} · ${report.hospital_name}</div>
        </div>

        <div class="card">
          <div class="label">Doctor</div>
          <div class="value">${report.doctor_name}</div>
        </div>

        <div class="card">
          <div class="label">Clinical Summary</div>
          <div class="value" style="font-size: 14px; margin-top: 8px; line-height: 1.6;">${report.summary || 'Patient was reviewed during the outpatient visit. Clinical findings were assessed, treatment was advised, and the patient was scheduled for routine review based on response to current therapy.'}</div>
        </div>

        <div class="card">
          <div class="label">Key Findings</div>
          <ul>${findings}</ul>
        </div>

        <div class="footer">
          Generated by QCare Kerala Digital Health Record System. This document is intended for clinical reference and patient guidance.
        </div>
      </body>
    </html>
  `;
}

export function downloadMedicalReport(report: MedicalReport) {
  const html = buildMedicalReportHtml(report);
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${report.title.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}.html`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
