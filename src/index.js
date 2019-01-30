import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react';
import ReactDOM from 'react-dom';
import '@atlaskit/css-reset';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';
import initialData from './initial-data';
import DashboardHeader from './dashboardHeader';
import Welcome from './welcome';
import Column from './column';
import Sequence from './sequence';
import Dashboard from './dashboard';
//import SaveButton from './saveButton';
import firebase from './firebase.js'; // <--- add this line

//import SidebarSwitch from './sidebarSwitch';
import uuid from 'uuid/v4';
import { FaBars } from 'react-icons/fa';
import './App.css';
import './styles.css';


const SwitchButton = styled.div`
  position: absolute;
  z-index: 1;
`;

const DashboardContainer = styled.div`
    background-color: #f0f0f0;
    background-image: url("data:image/svg+xml,%3Csvg width='12' height='16' viewBox='0 0 12 16' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4 .99C4 .445 4.444 0 5 0c.552 0 1 .45 1 .99v4.02C6 5.555 5.556 6 5 6c-.552 0-1-.45-1-.99V.99zm6 8c0-.546.444-.99 1-.99.552 0 1 .45 1 .99v4.02c0 .546-.444.99-1 .99-.552 0-1-.45-1-.99V8.99z' fill='%23c36ec9' fill-opacity='0.3' fill-rule='evenodd'/%3E%3C/svg%3E");
    height: 100vh;
}`;

const Container = styled.div`
  display: flex;
  padding: 20px;
  margin-left: 40px;
  margin-right: 40px;
  position: relative;
  top: 160px;
  background: white;
  height: 70%;

`;

const SaveButton = styled.div`
  float: right;
  background: dodger-blue;
`;

// TO DO 1/4/19
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
    this.state.dashboard = 'welcome';
    this.state.sidebar = false;
    this.showSidebar = this.showSidebar.bind(this);
    this.saveFlow = this.saveFlow.bind(this);
  }

  showSidebar() {
    this.setState({
      sidebar: !this.state.sidebar,
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
    duplicate.multiplied = 0;

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

  addMultiplier = (e, index) => {

    const pose = this.state.flowInfo[index];
    pose.multiplied = 1;
    console.log(pose);

    this.setState({
      flowInfo: {
        ...this.state.flowInfo,
        [pose.id]: pose,
      }
    })

  }

  increaseMultiplier = (e, index) => {
    const pose = this.state.flowInfo[index];
    pose.multiplied++;
    this.setState({
      flowInfo: {
        ...this.state.flowInfo,
        [pose.id]: pose,
      }
    })
  }

  decreaseMultiplier = (e, index) => {
    const pose = this.state.flowInfo[index];
    pose.multiplied--;
    this.setState({
      flowInfo: {
        ...this.state.flowInfo,
        [pose.id]: pose,
      }
    })
  }

  saveFlow() {
    const timeStamp = new Date();
    const timeString = timeStamp.toString();
    const itemsRef = firebase.database().ref('items');
    const flow = {
      flowOrder: this.state.flowInfo,
      sequenceColumn: this.state.columns['column-2'],
      submissionTime: timeString,
    }
    itemsRef.push(flow);
    alert('Flow Submitted!');
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

      // Use poseIndex to get full object of this.state.info {poseIndex}

      const duplicate = {...this.state.info[poseIndex]};

      duplicate.id = uuid();
      duplicate.originalId = poseIndex;
      duplicate.multiplied = 0;

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
      /* New state for column-2 */


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
    document.body.style = 'background-color: #6989a9;'


    return (
    <React.Fragment>
    <div className='container-fluid'>
    {(this.state.sidebar === true) && <Dashboard />}
    <DashboardContainer className={'container', this.state.sidebar ? "Pushed" : "" } >
      <DashboardHeader sidebar={this.state.sidebar}/>
      <SwitchButton onClick={this.showSidebar} >
        <FaBars style={{ color: "pink", height: 25, width: 25, padding: 10, cursor: 'pointer' }} />
      </SwitchButton>
        {this.state.dashboard === 'welcome' &&
          <Container>
            <Welcome />
          </Container> }
          {this.state.dashboard === 'flowbuildr' && <DragDropContext onDragStart={this.onDragStart} onDragUpdate={this.onDragUpdate} onDragEnd={this.onDragEnd}>
            <Container>
              { this.state.columnOrder.map(columnId => {
                console.log(this.state);
                const column = this.state.columns[columnId];
                let info = column.poseIds.map(poseId => this.state.info[poseId]);
                let flowInfo = column.poseIds.map(poseId => this.state.flowInfo[poseId]);

                if (columnId === 'column-1') {
                  return <Column key={column.id} column={column} info={info} addPose={this.addPose} />;
                } else if (columnId === 'column-2') {
                  return <Sequence key={column.id} column={column} info={flowInfo} removePose={this.removePose} addMultiplier={this.addMultiplier} increaseMultiplier={this.increaseMultiplier} decreaseMultiplier={this.decreaseMultiplier} />;
                }
              })}
            </Container>
            <SaveButton onClick={this.saveFlow}>
              <button>Save Flow</button>
            </SaveButton>
          </DragDropContext>
          }
      </DashboardContainer>
      </div>
    </React.Fragment>
  );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
