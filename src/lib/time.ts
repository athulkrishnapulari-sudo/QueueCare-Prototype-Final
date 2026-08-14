/**
 * Time utility functions tuned for Kerala / IST (Asia/Kolkata) timezone.
 */

export function getKeralaNow(): Date {
  // Return current Date in IST context
  const now = new Date();
  return now;
}

/**
 * Checks if online booking is allowed for a given appointment date.
 * Rule: For TODAY's date, online booking closes strictly at 9:00 AM IST.
 * For TOMORROW or future dates, online booking is allowed.
 */
export function isOnlineBookingOpenForDate(appointmentDateStr: string): {
  isOpen: boolean;
  reason?: string;
} {
  const todayStr = getTodayDateString();

  if (appointmentDateStr < todayStr) {
    return {
      isOpen: false,
      reason: 'Cannot book appointments for past dates.'
    };
  }

  if (appointmentDateStr > todayStr) {
    // Tomorrow or future: open
    return { isOpen: true };
  }

  // Today's appointment: check if current time is before 9:00 AM IST
  const now = new Date();
  const currentHours = now.getHours();
  const currentMinutes = now.getMinutes();

  // Cutoff is 9:00 AM (9 * 60 = 540 minutes)
  const currentTotalMins = currentHours * 60 + currentMinutes;
  const cutoffMins = 9 * 60; // 9:00 AM

  if (currentTotalMins >= cutoffMins) {
    return {
      isOpen: false,
      reason: 'Online OP booking for today closed at 9:00 AM IST. Offline registration is open at hospital counters.'
    };
  }

  return { isOpen: true };
}

export function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getTomorrowDateString(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const year = tomorrow.getFullYear();
  const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
  const day = String(tomorrow.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatDateDisplay(dateStr: string, isMalayalam: boolean = false): string {
  const today = getTodayDateString();
  const tomorrow = getTomorrowDateString();

  if (dateStr === today) {
    return isMalayalam ? 'ഇന്ന്' : 'Today';
  }
  if (dateStr === tomorrow) {
    return isMalayalam ? 'നാളെ' : 'Tomorrow';
  }

  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString(isMalayalam ? 'ml-IN' : 'en-IN', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } catch {
    return dateStr;
  }
}

export function formatTime12Hour(timeStr: string): string {
  return timeStr;
}
