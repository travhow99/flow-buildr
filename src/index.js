import React from 'react';
import ReactDOM from 'react-dom';
import '@atlaskit/css-reset';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';
import initialData from './initial-data';
import Column from './column';
import Sequence from './sequence';
import Dashboard from './dashboard';
//import SidebarSwitch from './sidebarSwitch';
import uuid from 'uuid/v4';
import { FaBars } from 'react-icons/fa';
import './App.css';


const SwitchButton = styled.div`
  position: fixed;
`;

const Container = styled.div`
  display: flex;
  margin-left: 30px;
`;

// TO DO 1/4/19
// Multiply option
  // ie "shiva squat x3"
// Templates
  // Sculpt, c1, c2 etc.
// Group option? Sun A, Sun B
// Save Option
  // Saves Current Flow, title it
  // Allow for opening and editing saved flows


class App extends React.Component {
  state = initialData;

  constructor (props) {
    super(props);
    this.state.dashboard = false;
    this.showDashboard = this.showDashboard.bind(this);
    this.addPose = this.addPose.bind(this);
    this.removePose = this.removePose.bind(this);
    this.addMultiplier = this.addMultiplier.bind(this);
  }

  showDashboard() {
    this.setState({
      dashboard: !this.state.dashboard,
    });
  }

  /* use larger function to add/remove/onDragEnd */

  addPose = (e, index) => {
    // Append (this) to end of 'column-2'
    const column = 'column-2';
    const finish = this.state.columns['column-2'];
    const finishPoseIds = Array.from(finish.poseIds);
    const poseIndex = index;
    const duplicate = {...this.state.info[poseIndex]};

    duplicate.id = uuid();
    duplicate.originalId = poseIndex;

    finishPoseIds.push(duplicate.id);

    const newFinish = {
      ...finish,
      poseIds:finishPoseIds,
    };


    /* New state for column-2 */
    this.setState({
      columns: {
        ...this.state.columns,
        [newFinish.id]: newFinish,
      }
    });

    const newState = {
      ...this.state,
      flowInfo: {
        ...this.state.flowInfo,
        [duplicate.id]: duplicate,
      },
      columns: {
        ...this.state.columns,
        [newFinish.id]: newFinish,
      }
    };
    this.setState(newState);
    return;

  }

  removePose = (e, index) => {

    // Append (this) to end of 'column-2'
    const column = 'column-2';
    const finish = this.state.columns['column-2'];
    const finishPoseIds = Array.from(finish.poseIds);
    const poseIndex = index;
    console.log(poseIndex, finishPoseIds);

    finishPoseIds.splice(poseIndex, 1);

    const newFinish = {
      ...finish,
      poseIds:finishPoseIds,
    };

    this.setState({
      columns: {
        ...this.state.columns,
        [newFinish.id]: newFinish,
      }
    });

  }

  addMultiplier() {

    console.log('add');
    // Add property this.props.multiplied
      // Show counter with Plus or minus on either side

    /*
    const column = 'column-2';
    const finish = this.state.columns['column-2'];
    const finishPoseIds = Array.from(finish.poseIds);
    const poseIndex = index + 1;
    console.log(poseIndex, finishPoseIds);

    finishPoseIds.splice(poseIndex, 0, );

    const newFinish = {
      ...finish,
      poseIds:finishPoseIds,
    };

    this.setState({
      columns: {
        ...this.state.columns,
        [newFinish.id]: newFinish,
      }
    });
    */
  }


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
    console.log(source);
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

      const poseIndex = source.index;

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
      };
      console.log(newFinish);

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
    <React.Fragment>
    {(this.state.dashboard === true) && <Dashboard />}
    <SwitchButton onClick={this.showDashboard} className={this.state.dashboard ? "Pushed" : "" } >
      <FaBars style={{ color: "pink", height: 25, width: 25, padding: 10, cursor: 'pointer' }} />
    </SwitchButton>
    <div id="dashboardContainer" className={this.state.dashboard ? "Pushed" : "" } >
        <DragDropContext onDragStart={this.onDragStart} onDragUpdate={this.onDragUpdate} onDragEnd={this.onDragEnd}>
          <Container>
            { this.state.columnOrder.map(columnId => {
              console.log(this.state);
              const column = this.state.columns[columnId];
              let info = column.poseIds.map(poseId => this.state.info[poseId]);
              let flowInfo = column.poseIds.map(poseId => this.state.flowInfo[poseId]);

              if (columnId === 'column-1') {
                return <Column key={column.id} column={column} info={info} addPose={this.addPose} />;
              } else if (columnId === 'column-2') {
                return <Sequence key={column.id} column={column} info={flowInfo} removePose={this.removePose} addMultiplier={this.addMultiplier} />;
              }
            })}
          </Container>
        </DragDropContext>
      </div>
    </React.Fragment>
  );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
