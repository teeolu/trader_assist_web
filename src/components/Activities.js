import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Timeline } from 'antd';
import { PlusSquareOutlined, ClockCircleOutlined } from '@ant-design/icons';

import { historyTag } from '../constants/historyConst';
import { humanReadableTime, sortBaseOnTime } from '../utils/time';
import { fontsize, typography, colors, fonts } from '../Css';

const Activities = ({ activities = [], navigation }) => {
  const classes = useStyles();
  function onNavigateActivity(el) {
    if (!el.route && !navigation) return;
    if (el.rootRoute) {
      navigation.navigate(el.rootRoute, {
        screen: el.route,
        params: { title: '', id: el.relevantId },
      });
    } else {
      navigation.navigate(el.route, {
        params: { title: '', id: el.relevantId },
      });
    }
  }

  return (
    <Timeline>
      {sortBaseOnTime(activities).map((el, i) => {
        return (
          <Timeline.Item>
            <div
              // onPress={() => onNavigateActivity(el)}
              key={el._id}
              style={{
                display: 'flex',
                minHeight: 50,
                marginLeft: 0,
                marginTop: 20,
              }}>
              <div>
                <p
                  style={{
                    ...typography.paragraph,
                    color: colors.black2,
                    marginBottom: 10,
                  }}>
                  {humanReadableTime(el.createdAt, true)}
                </p>
                <p style={{ color: colors.black }}>{el.desc}</p>
              </div>
            </div>
          </Timeline.Item>
        );
      })}
    </Timeline>
  );
};

const useStyles = makeStyles({
  header: {
    backgroundColor: '#e91e63',
    elevation: 20,
  },
  leftText: {
    ...fonts.h3,
    color: colors.white,
    marginLeft: 10,
    fontSize: 26,
    // zIndex: 100,
  },
  optionMenu: {
    height: 50,
    backgroundColor: 'rgba(0, 0, 0, .1)',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    // elevation: 300,
  },
  animateHeight: {
    position: 'relative',
    height: '100%',
    width: '100%',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  flexOne: {},
  alertIcon: {
    display: 'flex',
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.pinkLight,
    borderRadius: 25,
  },
  investorCard: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
});

export default Activities;

{
  /* <MaterialCommunityIcons
name={!!el.tag ? historyTag[el.tag].icon : 'download-outline'}
color={colors.white}
size={
  !!el.tag
    ? !!historyTag[el.tag].size
      ? historyTag[el.tag].size
      : 20
    : 20
}
/> */
}
