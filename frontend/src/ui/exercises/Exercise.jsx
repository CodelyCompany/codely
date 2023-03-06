import React, { useMemo } from 'react';

import StarIcon from '@mui/icons-material/Star';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { DiJsBadge } from 'react-icons/di';
import { DiLinux } from 'react-icons/di';
import { FaJava, FaPython } from 'react-icons/fa';
import { SiC, SiCplusplus, SiR } from 'react-icons/si';
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
  const languagesWithIcons = [
    {
      lang: 'JavaScript',
      icon: <DiJsBadge className='language-icon' />,
    },
    {
      lang: 'Bash',
      icon: <DiLinux className='language-icon' />,
    },
    {
      lang: 'C',
      icon: <SiC className='language-icon' />,
    },
    {
      lang: 'C++',
      icon: <SiCplusplus className='language-icon' />,
    },
    {
      lang: 'Java',
      icon: <FaJava className='language-icon' />,
    },
    {
      lang: 'Python',
      icon: <FaPython className='language-icon' />,
    },
    {
      lang: 'R',
      icon: <SiR className='language-icon' />,
    },
  ];

  const navigate = useNavigate();
  const color = useMemo(
    () =>
      parseInt(localStorage.getItem('theme') ?? 0) === 2
        ? 'secondary.main'
        : 'primary.main',
    [localStorage.getItem('theme')]
  );
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
          {
            languagesWithIcons.find(
              (el) => el.lang === exercise.programmingLanguage
            ).icon
          }{' '}
          {exercise.programmingLanguage}
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
