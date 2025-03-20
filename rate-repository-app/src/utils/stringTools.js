import { format } from 'date-fns';

export const formatDate = (jsonDate) => jsonDate
  ? format(jsonDate, 'dd.MM.yyyy - HH:mm:ss')
  : '-';
