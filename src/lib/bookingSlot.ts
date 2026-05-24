export type BookedSlot = { date: string; time: string };

export const normalizeBookingTime = (time?: string): string => {
  const raw = String(time || '').trim();
  if (!raw || ['N/A', 'undefined', 'null', 'Not specified'].includes(raw)) {
    return '00:00';
  }
  const match = raw.match(/^(\d{1,2}):(\d{2})/);
  if (match) {
    return `${match[1].padStart(2, '0')}:${match[2]}`;
  }
  return raw;
};

export const isSlotBooked = (
  slots: BookedSlot[],
  date: string,
  time: string
): boolean => {
  const normalized = normalizeBookingTime(time);
  return slots.some((s) => s.date === date && normalizeBookingTime(s.time) === normalized);
};
