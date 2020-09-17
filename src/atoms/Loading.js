import React from 'react';

export default function Loading({ marginTop }) {
  return (
    <div className="overlay">
      <div style={{ marginTop: !!marginTop ? marginTop : '10rem', textAlign: 'center' }}>
        <div className="spinner">
          <div className="bounce1"></div>
          <div className="bounce2"></div>
          <div className="bounce3"></div>
        </div>
        <p style={{ fontSize: '1rem' }}>fetching data...</p>
      </div>
    </div>
  );
}
