import React from 'react';
import ReactDOM from 'react-dom';
import '@atlaskit/css-reset';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';
import initialData from './initial-data';
import Column from './column';
import Sequence from './sequence';
import uuid from 'uuid/v4';

const Container = styled.div`
  display: flex;
`;

/** Need proper `source` & `destination` */

/* Here is ideal new pose data
  {
  "pose": {
    "id": 1,
    "sanskrit_name": "Navasana",
    "english_name": "Boat",
    "img_url": "https://www.dropbox.com/s/4m64ztxkj8a4dab/boatstraightlegs.svg?raw=1",
    "user_id": 1,
    "created_at": "2016-01-14T22:23:39.902Z",
    "updated_at": "2016-01-14T22:23:39.902Z"
  },
  "index": 0
}
*/

/**
 * Moves an item from one list to another list.
 */
const copy = (source, destination, droppableSource, droppableDestination) => {
  console.log(source, destination);

    // Array of PoseIDs in original column
    const sourceClone = Array.from(source.poseIds);

    if (!destination.poseIds) {
      destination.poseIds = [];
    }
    console.log(destination.poseIds);

    //const destClone = Array.from(destination.poseIds);
    const item = sourceClone[droppableSource.index];

    //destClone.splice(droppableDestination.index, 0, { ...item, id: 'test' });
    //return destClone;
};

class App extends React.Component {
  state = initialData;



  onDragStart = () => {
    // Use this to determine if <Clone /> is needed
  };


  onDragUpdate = update => {
    // const { destination } = update;
    /* const opacity = destination
      ? destination.index / Object.keys(this.state.info).length
      : 0; */
    // document.body.style.backgroundColor =  `rgba(153, 141, 217, ${opacity})`;
  };



  onDragEnd = result => {
    const { source, destination, draggableId } = result;
    // Goal: Place copy of dropped in column-2

    // dropped outside the list
    if (!destination) {
        return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const start = this.state.columns[source.droppableId];
    const finish = this.state.columns[destination.droppableId];
    const flow = this.state.flowInfo;
    console.log(start);
    console.log(finish);
    console.log(flow);

    // If moving from bank to flow
    if (start !== finish) {
      const finishPoseIds = Array.from(finish.poseIds);

      const poseIndex = source.index + 1;

      console.log(finish, finishPoseIds);

      // Use poseIndex to get full object of this.state.info {poseIndex}

      const duplicate = {...this.state.info[poseIndex]};
      console.log(duplicate);
      duplicate.id = uuid();
      duplicate.originalId = poseIndex;
      console.log(duplicate);

      finishPoseIds.splice(destination.index, 0, duplicate.id);

      // Set flowInfo key by getting last key
      let flowKey = 0;
      console.log(Object.keys(flow));
      if (Object.keys(flow).length === 0) {
        flowKey = 0;
      } else {
        const length = Object.keys(flow).length;
        flowKey = length;
      }

      const newFinish = {
        ...finish,
        poseIds:finishPoseIds,
        /*
        initialPosition: {
          ...finish.initialPosition,
          [flowKey]: flowKey
        },*/
        //info: this.poseIds
      };
      console.log(newFinish);
/*
      const currentFlow = Array.from(flow);
      currentFlow.splice(destination.index, 0, duplicate);
      console.log(currentFlow);
*/

      console.log(flowKey, duplicate);

      /* New state for column-2 */
      console.log(this.state);


      const newState = {
        ...this.state,
        flowInfo: {
          ...this.state.flowInfo,
          [duplicate.id]: duplicate,
        },
        columns: {
          ...this.state.columns,
          // Dynamic object key
          [newFinish.id]: newFinish,
        },
      };
      this.setState(newState);
      return;
    }

    // If reordering flow
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

  };

  render() {


    return (
    <DragDropContext onDragStart={this.onDragStart} onDragUpdate={this.onDragUpdate} onDragEnd={this.onDragEnd}>
      <Container>
        { this.state.columnOrder.map(columnId => {
          console.log(this.state);
          const column = this.state.columns[columnId];
          let info = column.poseIds.map(poseId => this.state.info[poseId]);
          let flowInfo = column.poseIds.map(poseId => this.state.flowInfo[poseId]);

          if (columnId === 'column-1') {
            return <Column key={column.id} column={column} info={info} />;
          } else if (columnId === 'column-2') {
            console.log(column.poseIds);
              return <Sequence key={column.id} column={column} info={flowInfo} />;
            }
        })}
      </Container>
    </DragDropContext>
  );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
