import React from 'react';
import ReactDOM from 'react-dom';
import '@atlaskit/css-reset';
import { DragDropContext } from 'react-beautiful-dnd';
import initialData from './initial-data';
import Column from './column';

class App extends React.Component {
  state = initialData;

  onDragStart = () => {
    document.body.style.color = 'orange';
    document.body.style.transition = 'background-color 0.2s ease';
  };
  // Not changing?

  onDragUpdate = update => {
    const { destination } = update;
    const opacity = destination
      ? destination.index / Object.keys(this.state.poses).length
      : 0;
    document.body.style.backgroundColor =  `rgba(153, 141, 217, ${opacity})`;
  }

// Not changing above, possibly remove?

  onDragEnd = result => {
    document.body.style.color = 'inherit';
    document.body.style.backgroundColor = 'inherit';
    // TO-DO: reorder columns
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const column = this.state.columns[source.droppableId];
    const newPoseIds = Array.from(column.poseIds);
    newPoseIds.splice(source.index, 1);
    newPoseIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...column,
      poseIds: newPoseIds,
    };

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newColumn.id]: newColumn,
      },
    };

    this.setState(newState);
  };

  render() {
    return (
      <DragDropContext onDragStart={this.onDragStart} onDragUpdate={this.onDragUpdate} onDragEnd={this.onDragEnd}>
      { this.state.columnOrder.map(columnId => {
      const column = this.state.columns[columnId];
      const poses = column.poseIds.map(poseId => this.state.poses[poseId]);

      return <Column key={column.id} column={column} poses={poses} />;
    })}
    </DragDropContext>
  );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
