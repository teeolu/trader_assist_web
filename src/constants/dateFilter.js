import moment from 'moment';
const dateFormat = 'YYYY-MM-DD h:mm:ss a';
export const overviewOptions = [
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
    startDate: moment(new Date())
      .subtract(90, 'd')

      .format(dateFormat),
    endDate: moment(new Date()).format(dateFormat),
    caption: '',
    option: '90 days',
  },
  // {startDate: '', endDate: moment(), caption: '', option: 'All time'},
];
