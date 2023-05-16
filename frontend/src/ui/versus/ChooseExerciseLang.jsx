import React from 'react';

import {
  Box,
  Checkbox,
  FormControlLabel,
  Paper,
  Typography,
} from '@mui/material';
import useTheme from 'helpers/useTheme';
import { PropTypes } from 'prop-types';
import { useTranslation } from 'react-i18next';

const ChooseExerciseLang = ({ formik }) => {
  const languages = ['JavaScript', 'Bash', 'C', 'C++', 'Java', 'Python', 'R'];
  const { t } = useTranslation();
  const { color } = useTheme();

  return (
    <Paper
      id='choose-versus-lang'
      elevation={3}
      sx={{ backgroundColor: color }}
    >
      <Typography variant='h6'>{t('Pick your languages')}</Typography>
      <form>
        <Box color={color} role='group' aria-labelledby='checkbox-group'>
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
        <Typography color='error'>
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
