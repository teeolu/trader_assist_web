import React from 'react';
import { Button } from 'antd';
import { makeStyles } from '@material-ui/styles';

import Typography from './Typography';
import { colors } from '../Css';

const Buttons = ({
  bgColor,
  textColor,
  btnText,
  btnAction,
  isLoading,
  style = {},
  textStyle = {},
  ...props
}) => {
  const classes = useStyles({ bgColor });

  return (
    <Button
      onClick={btnAction || null}
      className={classes.btn}
      loading={isLoading}
      style={{
        ...style,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: bgColor,
      }}
      {...props}>
      <Typography color={!!textColor ? textColor : colors.white} uppercase style={textStyle}>
        {btnText}
      </Typography>
    </Button>
  );
};

const useStyles = makeStyles({
  btn: {
    borderRadius: 5,
    padding: '17px 30px',
    border: 'none',
    height: 'auto',
    width: 'auto',
    marginTop: 20,
  },
});

export default React.memo(Buttons);
