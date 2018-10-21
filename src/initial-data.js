

const initialData = {
  poses: {
    'pose-1': { id: 'pose-1', content: 'Downward Dog'},
    'pose-2': { id: 'pose-2', content: 'Upward Dog'},
    'pose-3': { id: 'pose-3', content: 'Chaturanga'},
    'pose-4': { id: 'pose-4', content: 'Tabeltop'},
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'Pose Bank',
      poseIds: ['pose-1', 'pose-2', 'pose-3', 'pose-4'],
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

export default initialData;
