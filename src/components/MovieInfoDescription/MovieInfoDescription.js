import React from 'react';
import { Tooltip, Typography } from 'antd';
import './MovieInfoDescription.css';

const { Paragraph } = Typography;
const truncateText = (text, maxLength) => {
  if (!text) return 'Описание отсутствует';
  if (text.length <= maxLength) return text;

  const truncated = text.substring(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(' ');

  if (lastSpaceIndex === -1) {
    return `${truncated}...`;
  }

  return `${truncated.substring(0, lastSpaceIndex)}...`;
};

function MovieInfoDescription({ movie }) {
  return (
    <div className="movie-info-description">
      <Tooltip title={movie.overview}>
        <Paragraph className="movie-info-overview">
          {truncateText(movie.overview, 180)}
        </Paragraph>
      </Tooltip>
    </div>
  );
}

export default MovieInfoDescription;
