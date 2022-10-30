import React from 'react';

import Chart from 'chart.js/auto';
import * as _ from 'lodash';
import { PropTypes } from 'prop-types';
import { Line } from 'react-chartjs-2';

const PreparedExercisesChart = ({ exercises, mode }) => {
  const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const getDataSet = () => {
    const dataset = _.groupBy(
      exercises.map((ex) => new Date(ex.creationDate).getUTCMonth())
    );

    return [...Array(12).keys()].reduce((prev, curr) => {
      if (Object.keys(dataset).includes(curr.toString()))
        return [...prev, dataset[curr].length];
      return [...prev, 0];
    }, []);
  };

  return (
    <Line
      datasetIdKey='id'
      data={{
        labels,
        datasets: [
          {
            data: getDataSet(),
            label: mode === 'done' ? 'Solved exercises' : 'Prepared exercises',
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
      }}
    />
  );
};

export default PreparedExercisesChart;

PreparedExercisesChart.propTypes = {
  exercises: PropTypes.array,
  mode: PropTypes.string.isRequired,
};
