import React from 'react';
import ReactDOM from 'react-dom';
import '@atlaskit/css-reset';
import initialData from './initial-data';
import Column from './column';

class App extends React.Component {
  state = initialData;

  render() {
    return this.state.columnOrder.map(columnId => {
      const column = this.state.columns[columnId];
      const poses = column.poseIds.map(poseId => this.state.poses[poseId]);

      return <Column key={column.id} column={column} poses={poses} />;
    });
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
