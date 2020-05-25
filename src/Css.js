import { makeStyles } from '@material-ui/styles';

export const colors = {
  blue: 'rgba(54, 138, 231, 1)', //'#2E5BFF',
  lightblue: 'rgba(46,92,255,0.2)',
  green: '#a5dba4',
  red: '#e06775',
  yellow: '#F7C137',
  teal: '#00C1D4',
  purple: '#8C54FF',
  black: '#2E384D',
  black2: '#69707F',
  black3: '#8798AD',
  white: '#fff',
  gray: '#BFC5D2',
  gray2: '#F4F6FC',
  gray3: '#f5f5f5',
  caption: '#B0BAC9',
  input: 'rgba(224, 231, 255, 0.20)', // '#E0E7FF' 20%
  border: '#D6DDF6',
  card: 'rgba(46,91,255,0.08)',
  shadow: 'rgba(46,91,255,0.07)',
  active: '#ffe234',

  pinkLight: '#fff5f8',
  pinkDark: '#e91e63',
  pink: '#ff6c98',

  accent: '#F3534A',
  primary: '#0AC4BA',
  secondary: '#2BDA8E',
  tertiary: '#FFE358',
};

export const fontsize = {
  font: 15,
  h1: 48,
  h2: 34,
  h3: 28,
  h4: 20,
  base: 16,
  paragraph: 15,
  caption: 14,
  captionMedium: 12,

  font: 14,
  radius: 6,
  padding: 25,

  margin: 25,
  title: 24,
  border: 16,
  radius: 12,
};

export const typography = {
  h1: {
    // fontFamily: 'Montserrat-Medium',
    fontSize: fontsize.h1,
    color: colors.black,
    // letterSpacing: -0.6,
    // lineHeight: 57,
  },
  h2: {
    // fontFamily: 'Montserrat-Medium',
    fontSize: fontsize.h2,
    color: colors.black,
    // letterSpacing: 0,
    // lineHeight: 32,
  },
  h3: {
    // fontFamily: 'Montserrat-Medium',
    fontSize: fontsize.h3,
    color: colors.black,
    // letterSpacing: 0,
    // lineHeight: 32,
  },
  h4: {
    // fontFamily: 'Montserrat-Medium',
    fontSize: fontsize.h4,
    color: colors.black,
    // letterSpacing: 0,
    // lineHeight: 18,
  },
  paragraph: {
    // fontFamily: 'Montserrat-Regular',
    fontSize: fontsize.paragraph,
    color: '#67717d', //colors.black3,
    // letterSpacing: 0,
    // lineHeight: 22,
  },
  paragraphGray: {
    // fontFamily: 'Montserrat-Regular',
    fontSize: fontsize.paragraph,
    color: colors.gray,
    // letterSpacing: 0,
    // lineHeight: 22,
  },
  paragraphGray2: {
    // fontFamily: 'Montserrat-Regular',
    fontSize: fontsize.paragraph,
    color: colors.gray2,
    // letterSpacing: 0,
    // lineHeight: 22,
  },
  caption: {
    // fontFamily: 'Montserrat-Regular',
    fontSize: fontsize.caption,
    color: colors.black3,
  },
  captionMedium: {
    // fontFamily: 'Montserrat-Medium',
    fontSize: fontsize.captionMedium,
    color: colors.black3,
  },
  button: {
    // fontFamily: 'Montserrat-Medium',
    fontSize: fontsize.font,
    color: colors.white,
    letterSpacing: 0,
    lineHeight: 21,
  },
};

export const fonts = {
  light: 'Montserrat Light',
  regular: 'Montserrat Regular',
  semiBold: 'Montserrat SemiBold',
  bold: 'Montserrat Bold',
  thin: 'Montserrat Thin',
};

export const screenSizes = {
  mobile: '320px',
  tabs: '768px',
  laptops: '1224px',
  largeScreens: '1824px',
};

export const boxShadows = {
  card: '0 4px 8px 0 rgba(131,137,160,.2)',
};

export function spacingHelper(type, units, directions) {
  units = units !== undefined ? units : 24;
  directions = directions || 'blrt';
  const rules = {};
  if (directions.indexOf('b') > -1) {
    rules[`${type}Bottom`] = units;
  }
  if (directions.indexOf('l') > -1) {
    rules[`${type}Left`] = units;
  }
  if (directions.indexOf('r') > -1) {
    rules[`${type}Right`] = units;
  }
  if (directions.indexOf('t') > -1) {
    rules[`${type}Top`] = units;
  }
  return rules;
}

export function padding(units, directions) {
  return spacingHelper('padding', units, directions);
}

export function margin(units, directions) {
  return spacingHelper('margin', units, directions);
}

export const commonUseStyles = makeStyles({
  inputField: {
    outline: 'none',
    border: 'none',
    '&:focus': {
      transform: 'scaleY(1.15)',
      boxShadow: `0 0 0 2px ${colors.primaryGrey}`,
    },
    '&::placeholder': {
      fontSize: fontsize.xsmall,
    },
    '& .ant-select-selector': {
      '&:focus': {
        boxShadow: `0 0 0 2px ${colors.primaryGrey}`,
        // borderColor: colors.primaryGrey,
      },
    },
  },
  onBoardingUi: {
    display: 'flex',
    justifyContent: 'center',
    '& .ant-form-item': {
      marginBottom: 15,
    },
  },
  onBoardingCard: {
    maxWidth: '35%',
    marginTop: 50,
    padding: 20,
    boxShadow: boxShadows.card,
    borderRadius: 8,
    [`@media (max-width: ${screenSizes.tabs})`]: {
      maxWidth: '100%',
      minHeight: '100vh',
      boxShadow: 'none',
      padding: 0,
      marginTop: 0,
    },
    [`@media (min-width: ${screenSizes.tabs})`]: {
      marginTop: 50,
    },
    [`@media (min-width: ${screenSizes.laptops})`]: {
      maxWidth: '30%',
    },
  },
});
