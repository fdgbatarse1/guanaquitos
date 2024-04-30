'use client';

const getColorByStatus = (startDate: string, finalDate: string, theme: any) => {
  const today = new Date();
  const start = new Date(startDate);
  const end = new Date(finalDate);

  if (today < start) {
    return theme.palette.grey[300];
  }

  if (today > end) {
    return theme.palette.error.main;
  }

  return theme.palette.success.main;
};

export default getColorByStatus;
