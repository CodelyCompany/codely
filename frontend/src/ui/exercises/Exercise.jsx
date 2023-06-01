import React from 'react';

import StarIcon from '@mui/icons-material/Star';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useTheme from 'helpers/useTheme';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import languagesWithIcons from 'consts/languagesWithIcons';
import ProgrammingLanguage from 'consts/programmingLanguage';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: 'gold',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
});

const Exercise = ({ exercise }) => {
  const navigate = useNavigate();
  const { color } = useTheme();
  const exerciseLanguage =
    ProgrammingLanguage[exercise?.programmingLanguage.toUpperCase() === 'C++' ?
      'CPP' : exercise?.programmingLanguage.toUpperCase()];
  const exerciseIcon = languagesWithIcons[exerciseLanguage];

  return (
    <Card
      onClick={() => navigate(`/Exercise/${exercise._id}`)}
      id='exercise-container'
      sx={{ backgroundColor: color }}
    >
      <CardContent id='card-content-1'>
        <StyledRating
          id='rating'
          readOnly
          defaultValue={exercise.difficulty}
          precision={0.5}
          icon={<StarIcon fontSize='inherit' />}
          emptyIcon={<StarIcon fontSize='inherit' />}
        />
        <Typography id='rating-typography' variant='h4'>
          {exercise.title}
        </Typography>
        <Typography id='author-typography' variant='h6'>
          {exercise.author.username}
        </Typography>
      </CardContent>
      <CardContent id='card-content-2'>
        <Typography id='languages-typography' variant='body2'>
          {exerciseIcon}
          {exerciseLanguage}
        </Typography>
      </CardContent>
      <CardContent id='card-content-3'>
        <Typography id='card-content-typography'>
          {exercise.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Exercise;

Exercise.propTypes = {
  exercise: PropTypes.object.isRequired,
};
