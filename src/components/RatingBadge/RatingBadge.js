import React from 'react';

export default function RatingBadge({ rating }) {
  const safeRating = typeof rating === 'number' ? rating : 0;
  const formattedRating = safeRating.toFixed(1);

  const getBorderColor = (value) => {
    if (value >= 7) return '#66E900';
    if (value >= 5) return '#E9D100';
    if (value >= 3) return '#E97E00';
    return '#E90000';
  };

  return (
    <div
      style={{
        backgroundColor: 'transparent',
        fontSize: '12px',
        fontWeight: '400',
        borderRadius: '50%',
        border: `2px solid ${getBorderColor(safeRating)}`,
        height: '30px',
        width: '30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'black',
      }}
    >
      {formattedRating}
    </div>
  );
}
