import React, { useMemo } from 'react';

import { Box, Typography } from '@mui/material';
import Chart from 'chart.js/auto';
import { PropTypes } from 'prop-types';
import { Doughnut } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';

const VersusResults = ({ won, lost }) => {
  const { t } = useTranslation();
  const data = {
    labels: ['Won', 'Lost'],
    datasets: [
      {
        label: 'Matches',
        data: [won, lost],
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const color = useMemo(
    () =>
      parseInt(localStorage.getItem('theme') ?? 0) === 2
        ? 'secondary.main'
        : 'primary.main',
    [localStorage.getItem('theme')]
  );

  return (
    <Box id="versus-result-chart-container">
      <Typography
        variant='h6'
        sx={{
          borderTop:
            parseInt(localStorage.getItem('theme') ?? 0) === 0
              ? '3px solid black'
              : '3px solid',
          color,
        }}
      >
        {t('Your versus stats')}
      </Typography>
      <Doughnut
        className="user-chart"
        height={400}
        width={400}
        options={{
          maintainAspectRatio: false,
          responsive: false,
        }}
        data={data}
      />
    </Box>
  );
};

export default VersusResults;

VersusResults.propTypes = {
  won: PropTypes.number.isRequired,
  lost: PropTypes.number.isRequired,
};
