import moment from 'moment';
export const dateFormat = 'YYYY-MM-DD';
export const overviewOptions = [
  {
    startDate: moment(new Date())
      .subtract(90, 'd')

      .format(dateFormat),
    endDate: moment(new Date()).format(dateFormat),
    caption: '',
    option: '90 days',
  },
  {
    startDate: moment()
      .startOf('month')

      .format(dateFormat),
    endDate: moment()
      .endOf('month')

      .format(dateFormat),
    caption: 'May',
    option: 'This month',
  },
  {
    startDate: moment()
      .startOf('week')

      .format(dateFormat),
    endDate: moment()
      .endOf('week')

      .format(dateFormat),
    caption: 'sun - sat',
    option: 'This week',
  },
  {
    startDate: moment().startOf('day').format(dateFormat),
    endDate: moment()
      .endOf('day')

      .format(dateFormat),
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
    currentDate.date() != futureMonth.date() &&
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
