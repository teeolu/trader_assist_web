import moment from 'moment';
export const dateFormat = 'YYYY-MM-DD';
export const overviewOptions = [
  {
    startDate: moment(new Date()).subtract(90, 'd').startOf('day').format(),
    endDate: moment(new Date()).endOf('day').format(),
    caption: '',
    option: '90 days',
  },
  {
    startDate: moment().startOf('month').format(),
    endDate: moment().endOf('month').format(),
    caption: 'May',
    option: 'This month',
  },
  {
    startDate: moment().startOf('week').format(),
    endDate: moment().endOf('week').format(),
    caption: 'sun - sat',
    option: 'This week',
  },
  {
    startDate: moment().startOf('day').format(),
    endDate: moment().endOf('day').format(),
    caption: '',
    option: 'Today',
  },
  // {startDate: '', endDate: moment(), caption: '', option: 'All time'},
];

export const investmentDuration = (duration) => {
  var currentDate = moment();
  var futureMonth = moment(currentDate).add(parseInt(duration), 'M');
  var futureMonthEnd = moment(futureMonth).endOf('month');

  if (
    currentDate.date() !== futureMonth.date() &&
    futureMonth.isSame(futureMonthEnd.format('YYYY-MM-DD'))
  ) {
    futureMonth = futureMonth.add(1, 'd');
  }

  return {
    start: moment(currentDate).valueOf(),
    end: moment(futureMonth).valueOf(),
    range: parseInt(duration),
  };
};
