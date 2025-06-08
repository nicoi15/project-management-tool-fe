import { Dayjs } from 'dayjs';

export const getFormattedDate = (date: Dayjs) => {
  return date.format('YYYY-MM-DD');
};
