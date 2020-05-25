import React, { Component } from 'react';

import BgImg from '../assets/images/bg_img_1.jpg';
import { colors, typography } from '../Css';
import history from '../routes/history';

const OnboardingLayout = ({ children, title, caption, id }) => {
  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        backgroundImage: `url(${BgImg})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
      }}>
      <div
        style={{
          width: '70%',
          height: '100%',
          backgroundColor: colors.white,
        }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}>
          <div
            style={{
              width: '70%',
              height: '100%',
              position: 'relative',
            }}>
            <div
              style={{
                width: 'max-content',
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                right: 0,
                top: 50,
              }}>
              <p style={{ cursor: 'pointer', color: colors.black3 }}>Forgot password?</p>
              <p
                onClick={
                  id !== 'login' ? () => history.push('login') : () => history.push('register')
                }
                style={{
                  marginLeft: 20,
                  padding: '5px 10px',
                  border: `1px solid ${colors.pinkDark}`,
                  color: colors.pinkDark,
                  borderRadius: 50,
                  cursor: 'pointer',
                }}>
                {id === 'login' ? 'Create account' : 'Login'}
              </p>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                height: '100%',
              }}>
              <div>
                <h3 style={{ ...typography.h3, color: colors.pinkDark }}>{title}</h3>
                <p style={{ ...typography.paragraph, marginBottom: '2rem' }}>{caption}</p>
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingLayout;
