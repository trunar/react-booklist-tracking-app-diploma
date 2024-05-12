import React from 'react';

const StarRating = ({ rating, onRatingChange }) => {
  const handleStarClick = (clickedRating) => {
    onRatingChange(clickedRating);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          style={{ color: i <= rating ? 'gold' : 'grey', cursor: 'pointer' }}
          onClick={() => handleStarClick(i)}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className='starRating'>
      {renderStars()}
    </div>
  );
};

export default StarRating;
