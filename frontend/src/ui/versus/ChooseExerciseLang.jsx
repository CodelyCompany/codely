import React from 'react';

import { Checkbox, FormControlLabel, Paper, Typography } from '@mui/material';
import { PropTypes } from 'prop-types';

const ChooseExerciseLang = ({ formik }) => {
  const languages = ['JavaScript', 'Bash', 'C', 'C++', 'Java', 'Python', 'R'];

  return (
    <Paper elevation={3} sx={{ padding: '10px', margin: '10px 0' }}>
      <Typography variant='h6' color='primary' fontWeight={'bolder'}>
        Pick your languages
      </Typography>
      <form>
        <div role='group' aria-labelledby='checkbox-group'>
          {languages.map((el) => (
            <FormControlLabel
              key={el}
              control={
                <Checkbox
                  id={el}
                  name='checked'
                  checked={formik.values.checked.includes(
                    el === 'C++' ? 'cpp' : el.toLowerCase()
                  )}
                  value={el === 'C++' ? 'cpp' : el.toLowerCase()}
                  onChange={formik.handleChange}
                />
              }
              label={
                <span style={{ position: 'relative', top: '3px' }}>{el}</span>
              }
            />
          ))}
        </div>
        <Typography fontWeight={'bolder'} color='error'>
          {formik.errors && formik.errors.checked}
        </Typography>
      </form>
    </Paper>
  );
};

export default ChooseExerciseLang;

ChooseExerciseLang.propTypes = {
  formik: PropTypes.object.isRequired,
};
