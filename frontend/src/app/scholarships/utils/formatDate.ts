import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

const formatDate = (date: string) =>
  format(parseISO(date), "d 'de' MMMM 'de' yyyy", { locale: es });

export default formatDate;
