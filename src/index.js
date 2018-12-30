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
    console.log('starting');
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

    console.log(source, destination);

    const col = this.state.columns[destination.droppableId];
    //console.log(col, source, destination);

    //col.poseIds.push(source.index);



    const start = this.state.columns[source.droppableId];
    const finish = this.state.columns[destination.droppableId];

    // If moving from bank to flow
    if (start !== finish) {
      const finishPoseIds = Array.from(finish.poseIds);

      const poseIndex = source.index + 1;
      finishPoseIds.splice(destination.index, 0, poseIndex);

      console.log(finishPoseIds);

      const newFinish = {
        ...finish,
        poseIds:finishPoseIds,
        //info: this.poseIds
      };
      /* New state for column-2 */
      console.log(newFinish);

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          // Dynamic object key
          [newFinish.id]: newFinish,
        },
      };
      this.setState(newState);
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
    document.body.style.backgroundColor = 'linear-gradient(to bottom right, #fcccff, #845cff);'

    return (
    <DragDropContext onDragStart={this.onDragStart} onDragUpdate={this.onDragUpdate} onDragEnd={this.onDragEnd}>
      <Container>
        { this.state.columnOrder.map(columnId => {
          const column = this.state.columns[columnId];
          const info = column.poseIds.map(poseId => this.state.info[poseId]);

          if (columnId === 'column-1') {
            return <Column key={column.id} column={column} info={info} />;
          } else if (columnId === 'column-2') {
              return <Sequence key={column.id} column={column} info={info} />;
            }
        })}
      </Container>
    </DragDropContext>
  );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
