import React, { useMemo } from 'react';

import {
  Box,
  Checkbox,
  FormControlLabel,
  Paper,
  Typography,
} from '@mui/material';
import { PropTypes } from 'prop-types';
import { useTranslation } from 'react-i18next';

const ChooseExerciseLang = ({ formik }) => {
  const languages = ['JavaScript', 'Bash', 'C', 'C++', 'Java', 'Python', 'R'];

  const { t } = useTranslation();

  const color = useMemo(
    () =>
      parseInt(localStorage.getItem('theme') ?? 0) === 2
        ? 'secondary'
        : 'primary',
    [localStorage.getItem('theme')]
  );

  return (
    <Paper
      elevation={3}
      sx={{
        padding: '10px',
        margin: '10px 0',
        backgroundColor: `${color}.main`,
      }}
    >
      <Typography variant='h6' color='white' fontWeight={'bolder'}>
        {t('Pick your languages')}
      </Typography>
      <form>
        <Box
          color={color}
          role='group'
          aria-labelledby='checkbox-group'
          style={{ color: 'white' }}
        >
          {languages.map((el) => (
            <FormControlLabel
              key={el}
              control={
                <Checkbox
                  color='checkbox'
                  id={el}
                  name='checked'
                  checked={formik.values.checked.includes(
                    el === 'C++' ? 'cpp' : el.toLowerCase()
                  )}
                  value={el === 'C++' ? 'cpp' : el.toLowerCase()}
                  onChange={formik.handleChange}
                />
              }
              label={<span>{el}</span>}
            />
          ))}
        </Box>
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
