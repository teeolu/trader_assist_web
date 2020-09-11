import React from 'react';

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
      <h1
        style={{
          fontWeight: 200,
          fontSize: '4em',
          margin: '1em',
        }}>
        500 Error
      </h1>
      <p
        style={{
          fontSize: '1.2em',
        }}>
        Oops, an error occured, please try again
      </p>
    </div>
  );
}
