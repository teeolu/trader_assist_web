import React from 'react';
import { Typography as antTypography } from 'antd';
import { fonts } from '../Css';

const { Title, Text } = antTypography;

const Typography = ({
  type,
  children,
  bold,
  semiBold,
  style,
  className,
  capitalize,
  uppercase,
  thin,
  center,
  color,
}) => {
  let template;

  const properties = {
    style: {},
  };

  if (className) properties['className'] = className;
  if (thin) {
    properties.style = {
      ...properties.style,
      fontFamily: fonts.thin,
    };
  }
  if (bold) {
    properties.style = {
      ...properties.style,
      fontFamily: fonts.bold,
    };
  }
  if (semiBold) {
    properties.style = {
      ...properties.style,
      fontFamily: fonts.semiBold,
    };
  }
  if (capitalize) {
    properties.style = {
      ...properties.style,
      textTransform: 'capitalize',
    };
  }
  if (style) {
    properties.style = {
      ...properties.style,
      ...style,
    };
  }
  if (center) {
    properties.style = {
      ...properties.style,
      textAlign: 'center',
    };
  }
  if (uppercase) {
    properties.style = {
      ...properties.style,
      textTransform: 'uppercase',
    };
  }
  if (color) {
    properties.style = {
      ...properties.style,
      color,
    };
  }

  switch (type) {
    case 'h1':
      template = <Title {...properties}>{children}</Title>;
      break;
    case 'h2':
      template = (
        <Title level={2} {...properties}>
          {children}
        </Title>
      );
      break;
    case 'h3':
      template = (
        <Title level={3} {...properties}>
          {children}
        </Title>
      );
      break;
    case 'h4':
      template = (
        <Title level={4} {...properties}>
          {children}
        </Title>
      );
      break;
    default:
      template = <Text {...properties}>{children}</Text>;

      break;
  }
  return <>{template}</>;
};

export default Typography;
