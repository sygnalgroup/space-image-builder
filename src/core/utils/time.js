import moment from 'moment/min/moment-with-locales';

export const formatDate = (value, format, locale = 'en') => {
  return moment(value, 'YYYY-MM-DD HH:mm:ss [UTC]')
    .locale(locale)
    .format(format);
};

export const formatDateSmart = (value, locale = 'en') => {
  const date = moment(value, 'YYYY-MM-DD HH:mm:ss [UTC]').locale(locale);
  const format = moment(value).isSame(moment(), 'day')
    ? '[Today at] HH:mm'
    : 'MM/DD/YYYY [at] HH:mm';

  return date.format(format);
};
