import moment from 'moment';

export const humanReadableTime = (date, time) => {
  if (time) {
    return moment(date).format('ddd Do MMM, hh:mm:ss a');
  }
  return moment(date).format('ddd Do MMM');
};

export const sortBaseOnTime = (arrayOfObj) => {
  return arrayOfObj
    .map((el) => {
      return {
        ...el,
        createdAt: moment(el.createdAt).valueOf(),
      };
    })
    .sort(({ createdAt: aCreatedAt }, { createdAt: bCreatedAt }) => bCreatedAt - aCreatedAt);
};
