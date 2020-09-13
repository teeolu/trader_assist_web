import React from 'react';

export default function Loading({ marginTop }) {
  return (
    <div className="overlay">
      <div style={{ marginTop: !!marginTop ? marginTop : '10rem', textAlign: 'center' }}>
        <div class="spinner">
          <div class="bounce1"></div>
          <div class="bounce2"></div>
          <div class="bounce3"></div>
        </div>
        <p style={{ fontSize: '1rem' }}>fetching data...</p>
      </div>
    </div>
  );
}
