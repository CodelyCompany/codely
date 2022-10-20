import * as React from 'react';

import WhatshotIcon from '@mui/icons-material/Whatshot';
import { Button } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
});

const Exercise = ({ exercise }) => (
  <Card
    sx={{
      width: '250px',
      height: '250px',
      margin: '10px',
      backgroundColor: 'rgba(25, 118, 210, 0.56)',
    }}
  >
    <CardContent>
      <Typography
        sx={{ fontWeight: 'bolder' }}
        variant="h5"
        color="text.secondary"
      >
        {exercise.title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Author: {exercise.author.username}
      </Typography>
    </CardContent>
    <CardContent>
      <Typography variant="body2" color="text.secondary">
        Language: {exercise.programmingLanguage}
      </Typography>
      <StyledRating
        readOnly
        defaultValue={exercise.difficulty}
        precision={0.5}
        icon={<WhatshotIcon fontSize="inherit" />}
        emptyIcon={<WhatshotIcon fontSize="inherit" />}
      />
    </CardContent>
    <CardContent sx={{ textAlign: 'center' }}>
      <Button variant="contained">Try to solve!</Button>{' '}
    </CardContent>
  </Card>
);

export default Exercise;

Exercise.propTypes = {
  exercise: PropTypes.object.isRequired,
};
