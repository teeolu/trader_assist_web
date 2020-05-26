import { sortBaseOnTime, humanReadableTime } from './time';

export const generateNextReturns = (arrayOfObj) => {
  const sortedArray = sortBaseOnTime(arrayOfObj);
  if (sortedArray.length === 0) return sortedArray;
  return `Next return NGN${sortedArray[
    sortedArray.length - 1
  ].amount.toLocaleString()} (${humanReadableTime(sortedArray[sortedArray.length - 1].dueDate)})`;
};

export const generatePreviousReturn = (arrayOfObj) => {
  const sortedArray = sortBaseOnTime(arrayOfObj).filter((el) => el.isConfirmed === true);
  return !!sortedArray[0]
    ? `Previous return NGN${sortedArray[
        sortedArray.length - 1
      ].amount.toLocaleString()} (${humanReadableTime(
        sortedArray[sortedArray.length - 1].dueDate,
      )})`
    : 'No previous return';
};
