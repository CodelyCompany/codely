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
  const style = {
    marginRight: '5px',
    fontSize: '40px',
    position: 'relative',
    top: '15px',
  };

  const languagesWithIcons = [
    {
      lang: 'JavaScript',
      icon: <DiJsBadge style={style} />,
    },
    {
      lang: 'Bash',
      icon: <DiLinux style={style} />,
    },
    {
      lang: 'C',
      icon: <SiC style={style} />,
    },
    {
      lang: 'C++',
      icon: <SiCplusplus style={style} />,
    },
    {
      lang: 'Java',
      icon: <FaJava style={style} />,
    },
    {
      lang: 'Python',
      icon: <FaPython style={style} />,
    },
    {
      lang: 'R',
      icon: <SiR style={style} />,
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
      sx={{
        backgroundColor: color,
        width: '100%',
        cursor: 'pointer',
        marginTop: '10px',
        '&:hover': { transform: 'scale(1.05)' },
      }}
    >
      <CardContent sx={{ position: 'relative' }}>
        <StyledRating
          sx={{ position: 'absolute' }}
          readOnly
          defaultValue={exercise.difficulty}
          precision={0.5}
          icon={<StarIcon fontSize='inherit' />}
          emptyIcon={<StarIcon fontSize='inherit' />}
        />
        <Typography
          sx={{
            fontWeight: 'bolder',
            textAlign: 'center',
            borderBottom: '1px solid white',
          }}
          variant='h4'
          color='white'
        >
          {exercise.title}
        </Typography>
        <Typography sx={{ fontWeight: 'bolder' }} variant='h6' color='white'>
          {exercise.author.username}
        </Typography>
      </CardContent>
      <CardContent>
        <Typography
          sx={{ fontWeight: 'bolder', position: 'relative', bottom: '20px' }}
          variant='body2'
          color='white'
        >
          {
            languagesWithIcons.find(
              (el) => el.lang === exercise.programmingLanguage
            ).icon
          }{' '}
          {exercise.programmingLanguage}
        </Typography>
      </CardContent>
      <CardContent>
        <Typography
          color='white'
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
