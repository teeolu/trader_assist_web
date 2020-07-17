import React from 'react';
import { Link } from 'react-router-dom';

export default function () {
  return (
    <div
      style={{
        textAlign: 'center',
        margin: 0,
        background: 'linear-gradient(120deg, #6F1E51 0%, #ED4C67 100%)',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        color: '#fff',
        height: '100vh',
      }}>
      <img
        style={{
          width: 250,
          margin: 'auto',
          paddingTop: '3em',
        }}
        src="https://images.plurk.com/5pHVCIyRNMdudWmVrrtQ.png"
        alt=""
      />
      <h1
        style={{
          fontWeight: 200,
          fontSize: '4em',
          margin: '1em',
        }}>
        401 Unauthorized
      </h1>
      <p
        style={{
          fontSize: '1.2em',
        }}>
        You are not authorized to view this page, <Link to="/login">LOGIN</Link>
      </p>
    </div>
  );
}
