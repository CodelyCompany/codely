import * as React from 'react';

import StarIcon from '@mui/icons-material/Star';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

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

  return (
    <Card
      onClick={() => navigate(`/Exercise/${exercise._id}`)}
      sx={{
        width: 'calc((95% - 30px) / 4)',
        height: 'calc(95% / 2)',
        backgroundColor: 'rgb(25, 118, 210)',
        cursor: 'pointer',
        margin: '10px',
        '&:hover': { transform: 'scale(1.1)' },
      }}
    >
      <CardContent>
        <Typography
          sx={{
            fontWeight: 'bolder',
            textAlign: 'center',
            borderBottom: '1px solid white',
          }}
          variant="h4"
          color="white"
        >
          {exercise.title}
        </Typography>
        <Typography sx={{ fontWeight: 'bolder' }} variant="h6" color="white">
          {exercise.author.username}
        </Typography>
      </CardContent>
      <CardContent>
        <Typography sx={{ fontWeight: 'bolder' }} variant="body2" color="white">
          Language: {exercise.programmingLanguage}
        </Typography>
        <StyledRating
          readOnly
          defaultValue={exercise.difficulty}
          precision={0.5}
          icon={<StarIcon fontSize="inherit" />}
          emptyIcon={<StarIcon fontSize="inherit" />}
        />
      </CardContent>
      <CardContent>
        <Typography
          color="white"
          sx={{
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}
        >
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
