import React, { Component } from 'react';
import poseData from './poseData.json';

const refinedData = poseData.map(function(yogaPose){
  return <li>{yogaPose.sanskrit_name} - {yogaPose.english_name}</li>;
});

//console.log(Object.entries(poseData));


const initialData = {
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'Pose Bank',
      poseIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 0],
      poseUrls: [],
    },
    'column-2': {
      id: 'column-2',
      title: 'Sequence',
      poseIds: [],
    },
  },
  // Facilitate reordering of the columns
  columnOrder: ['column-1', 'column-2'],
};



initialData['info'] = Object.assign({}, poseData);

export default initialData;
