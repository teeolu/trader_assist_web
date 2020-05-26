import React from 'react';
import { Button } from 'antd';
import { makeStyles } from '@material-ui/styles';

import Typography from './Typography';
import { colors } from '../Css';

const Buttons = ({ bgColor, textColor, btnText, btnAction, isLoading, style = {}, ...rest }) => {
  const classes = useStyles({ bgColor });

  return (
    <Button
      btnAction={btnAction}
      className={classes.btn}
      loading={isLoading}
      style={{
        ...style,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: bgColor,
      }}
      type="primary"
      htmlType="submit">
      <Typography color={!!textColor ? textColor : colors.white} uppercase {...rest}>
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
