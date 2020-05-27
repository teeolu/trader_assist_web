import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { PlusSquareOutlined } from '@ant-design/icons';

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
    <div style={{ position: 'relative' }}>
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 20,
          width: 1,
          backgroundColor: '#ddd',
        }}
      />
      {sortBaseOnTime(activities).map((el, i) => (
        <div
          // onPress={() => onNavigateActivity(el)}
          key={el._id}
          style={{
            ...classes.flexRow,
            minHeight: 50,
            marginLeft: 0,
            marginTop: 20,
            shadowColor: 'rgba(0, 0, 0, 0.3)',
            shadowOpacity: 0.1,
            elevation: 1,
            shadowRadius: 2,
            shadowOffset: { width: 1, height: 3 },
          }}>
          <div
            style={{
              height: 40,
              width: 40,
              borderRadius: 30,
              backgroundColor: !!el.tag ? historyTag[el.tag].color : colors.white,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {/* <MaterialCommunityIcons
                name={!!el.tag ? historyTag[el.tag].icon : 'download-outline'}
                color={colors.white}
                size={
                  !!el.tag
                    ? !!historyTag[el.tag].size
                      ? historyTag[el.tag].size
                      : 20
                    : 20
                }
              /> */}
            <PlusSquareOutlined style={{ color: colors.pinkDark, fontSize: fontsize.h4 }} />
          </div>

          <div style={{ marginLeft: 10 }}>
            <p
              style={{
                ...typography.paragraph,
                color: colors.black2,
                marginBottom: 10,
              }}>
              {humanReadableTime(el.createdAt, true)}
            </p>
            <p style={{ color: colors.black, paddingRight: 20 }}>{el.desc}</p>
          </div>
        </div>
      ))}
    </div>
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
    elevation: 300,
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
