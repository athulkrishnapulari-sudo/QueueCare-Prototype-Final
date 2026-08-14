import React from 'react';
import { LoadStatus, AppointmentStatus } from '../../types';

interface StatusBadgeProps {
  status: LoadStatus | AppointmentStatus | string;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  let colorClasses = 'bg-slate-100 text-slate-700 border-slate-300';
  let dotColor = 'bg-slate-500';

  if (status === 'Low' || status === 'Confirmed' || status === 'Completed' || status === 'Paid') {
    colorClasses = 'bg-emerald-50 text-emerald-800 border-emerald-200';
    dotColor = 'bg-emerald-600';
  } else if (status === 'Moderate' || status === 'Waiting' || status === 'Pending') {
    colorClasses = 'bg-amber-50 text-amber-800 border-amber-200';
    dotColor = 'bg-amber-500';
  } else if (status === 'High' || status === 'Cancelled' || status === 'Failed') {
    colorClasses = 'bg-rose-50 text-rose-800 border-rose-200';
    dotColor = 'bg-rose-600';
  } else if (status === 'Called' || status === 'In consultation') {
    colorClasses = 'bg-blue-50 text-blue-800 border-blue-200 animate-pulse';
    dotColor = 'bg-blue-600';
  }

  const px = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs font-semibold';

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border ${colorClasses} ${px}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
      <span>{status}</span>
    </span>
  );
};
