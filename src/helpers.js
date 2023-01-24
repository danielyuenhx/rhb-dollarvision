export const today = new Date();
export const firstDayOfMonth = new Date(
  today.getFullYear(),
  today.getMonth(),
  1,
  8
)
  .toISOString()
  .split('T')[0];
export const lastDayOfMonth = new Date(
  today.getFullYear(),
  today.getMonth() + 1,
  0,
  8
)
  .toISOString()
  .split('T')[0];

export const setPreviousMonth = (selectedStartDate, setSelectedStartDate, setSelectedEndDate) => {
  const newDate = new Date(selectedStartDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setSelectedStartDate(newDate.toISOString().split('T')[0]);
    setSelectedEndDate(
      new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0, 8)
        .toISOString()
        .split('T')[0]
    );
}

export const setNextMonth = (selectedStartDate, setSelectedStartDate, setSelectedEndDate) => {
  const newDate = new Date(selectedStartDate);
  newDate.setMonth(newDate.getMonth() + 1);
  setSelectedStartDate(newDate.toISOString().split('T')[0]);
  setSelectedEndDate(
    new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0, 8)
      .toISOString()
      .split('T')[0]
  );
}
