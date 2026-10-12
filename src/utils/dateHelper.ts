export const getCurrentDayIndex = (): number => {
  const today = new Date();
  return today.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
};

export const getFormattedCurrentDate = (): string => {
  const today = new Date();
  return today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const getDayNameFromIndex = (index: number): string => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[index] || 'Monday';
};
