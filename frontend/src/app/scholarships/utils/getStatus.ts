import { format } from 'date-fns';

import formatDate from './formatDate';

// Dates are YYYY-MM-DD, so they compare as text. Nothing is claimed without a date.
const getStatus = (start: string | null, end: string | null) => {
  const today = format(new Date(), 'yyyy-MM-dd');
  if (end && end < today) return { label: 'Cerrada', color: 'error.main' };
  if (start && start > today)
    return { label: `Abre el ${formatDate(start)}`, color: 'text.secondary' };
  if (end) return { label: `Abierta hasta el ${formatDate(end)}`, color: 'success.main' };
  return null;
};

export default getStatus;
