import React from 'react';
import ReactDOM from 'react-dom';
import '@atlaskit/css-reset';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';
import initialData from './initial-data';
import Column from './column';

const Container = styled.div`
  display: flex;
`;

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
      ? destination.index / Object.keys(this.state.info).length
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

    const start = this.state.columns[source.droppableId];
    const finish = this.state.columns[destination.droppableId];

    if (start === finish) {
      const newPoseIds = Array.from(start.poseIds);
      newPoseIds.splice(source.index, 1);
      newPoseIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
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
      return;
    }

    // Moving from one list to another
    const startPoseIds = Array.from(start.poseIds);
    startPoseIds.splice(source.index, 1);
    const newStart = {
      ...start,
      poseIds: startPoseIds,
    };

    const finishPoseIds = Array.from(finish.poseIds);
    finishPoseIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      poseIds:finishPoseIds,
    };

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    this.setState(newState);
  };

  render() {
    document.body.style.backgroundColor = 'linear-gradient(to bottom right, #fcccff, #845cff);'

    return (
      <DragDropContext onDragStart={this.onDragStart} onDragUpdate={this.onDragUpdate} onDragEnd={this.onDragEnd}>
        <Container>
          { this.state.columnOrder.map(columnId => {
          const column = this.state.columns[columnId];
          const info = column.poseIds.map(poseId => this.state.info[poseId]);

          return <Column key={column.id} column={column} info={info} />;
        })}
      </Container>
    </DragDropContext>
  );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
