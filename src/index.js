import React from 'react';
import ReactDOM from 'react-dom';
import '@atlaskit/css-reset';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';
import initialData from './initial-data';
import Column from './column';
import Sequence from './sequence';


const Container = styled.div`
  display: flex;
`;

class App extends React.Component {
  state = initialData;


  onDragStart = () => {
    // document.body.style.color = 'orange';
    // document.body.style.transition = 'background-color 0.2s ease';
  };


  onDragUpdate = update => {
    // const { destination } = update;
    /* const opacity = destination
      ? destination.index / Object.keys(this.state.info).length
      : 0; */
    // document.body.style.backgroundColor =  `rgba(153, 141, 217, ${opacity})`;
  }



  onDragEnd = result => {
    document.body.style.color = 'inherit';
    document.body.style.backgroundColor = 'inherit';


    const { destination, source, draggableId } = result;

    // return drops outside of dropzone
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
    const defaultPoseIds = Array.from(start.poseIds);
    const startPoseIds = Array.from(start.poseIds);
    startPoseIds.splice(source.index, 1);
    const newStart = {
      ...start,
      poseIds: startPoseIds, // Should be defaultPoseIds?, but need to create new element on drop
    }; // Use https://github.com/atlassian/react-beautiful-dnd/issues/216 for solution
      // Example: https://codesandbox.io/s/40p81qy7v0

    const finishPoseIds = Array.from(finish.poseIds);
    finishPoseIds.splice(destination.index, 0, draggableId);

    // const newPose = newPoseId(finishPoseIds);
    //console.log(newPose);

    const newFinish = {
      ...finish,
      poseIds:finishPoseIds,
    };

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        //[newStart.id]: newStart, Commented out to keep column 1 pose in place
        //Create new key on drop?
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
          const column = this.state.columns['column-1'];
          const info = column.poseIds.map(poseId => this.state.info[poseId]);

          return <Column key={column.id} column={column} info={info} />;
        })}
      </Container>

      <Sequence>
        { this.state.columnOrder.map(columnId => {
        const column = this.state.columns['column-1'];
        const info = column.poseIds.map(poseId => this.state.info[poseId]);

        return <Column key={column.id} column={column} info={info} />;
      })}
    </Sequence>
    </DragDropContext>
  );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

function newPoseId(pose) {
  //return pose;
  for (let x = 0; x < pose.length; x++) {
    pose[x] = pose[x] + 1;
    console.log(pose[x]);

  }
  //let newId = pose.map(pose += 'b');
  return pose;
}
