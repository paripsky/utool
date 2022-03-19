export const formatDate = (
  date: Date,
  {
    year = 'numeric',
    month = 'numeric',
    day = 'numeric',
    hour = 'numeric',
    minute = 'numeric',
    second = 'numeric',
    hour12 = false,
    timeZone = 'Asia/Jerusalem',
    timeZoneName = 'short',
  }: Intl.DateTimeFormatOptions = {}
) => {
  const options = {
    year,
    month,
    day,
    hour,
    minute,
    second,
    hour12,
    timeZone,
    timeZoneName,
  };

  return new Intl.DateTimeFormat('he-IL', options).format(date);
};

export default {
  formatDate,
};
