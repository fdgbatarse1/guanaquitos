import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

const formatDate = (date: string) => format(parseISO(date), 'dd MMMM yyyy', { locale: es });

export default formatDate;
