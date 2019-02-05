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
import Login from './login';
import DashboardHeader from './dashboardHeader';
import Welcome from './welcome';
import Column from './column';
import Sequence from './sequence';
import Dashboard from './dashboard';
// import Title from './title';
import PastSequences from './pastSequences';
import firebase, { auth, provider } from './firebase.js'; // <--- add this line

//import SidebarSwitch from './sidebarSwitch';
import uuid from 'uuid/v4';
import { FaBars, FaEdit } from 'react-icons/fa';
import './App.css';
import './styles.css';


const SwitchButton = styled.div`
  position: absolute;
  z-index: 1;
`;

const DashboardContainer = styled.div`
/*    height: 100vh;*/
}`;

const Container = styled.div`
  width: 100%;
  display: flex;
  margin-left: 40px;
  margin-right: 40px;
  margin-top: -94px;
  margin-bottom: 40px;
  height: 720px;
  box-shadow: rgba(132, 125, 125, 0.92) 0px 2px 15px;
  padding: 20px;
  background: white;
`;

const TitleForm = styled.form`
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: fit-content;
`;

const Title = styled.h2`
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: fit-content;
`;

const SaveButton = styled.div`
  position: absolute;
  right: 20px;
  bottom: 15px;
`;

const bodyStyle = `background-color: #f0f0f0;
    background-image: url("data:image/svg+xml,%3Csvg width='12' height='16' viewBox='0 0 12 16' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4 .99C4 .445 4.444 0 5 0c.552 0 1 .45 1 .99v4.02C6 5.555 5.556 6 5 6c-.552 0-1-.45-1-.99V.99zm6 8c0-.546.444-.99 1-.99.552 0 1 .45 1 .99v4.02c0 .546-.444.99-1 .99-.552 0-1-.45-1-.99V8.99z' fill='%23c36ec9' fill-opacity='0.3' fill-rule='evenodd'/%3E%3C/svg%3E");`

// TO DO 1/4/19
// Templates
  // Sculpt, c1, c2 etc.
// Group option? Sun A, Sun B
// Save Option
  // Saves Current Flow, title it
  // Upon save, switch to edit mode
    // IF
  // Allow for opening and editing saved flows

  // Edit, Delete, Star/Reorder for pastFlows


class App extends React.Component {

  state = initialData;

  constructor (props) {
    super(props);
    this.state.dashboard = 'welcome';
    this.state.sidebar = false;
    this.state.titleInput = '';
    this.state.title = '';
    this.state.user = null;

    this.gatherFlows = this.gatherFlows.bind(this);
    this.showSidebar = this.showSidebar.bind(this);
    this.saveFlow = this.saveFlow.bind(this);
    //this.getFlow = this.getFlow.bind(this);
    this.navigate = this.navigate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitTitle = this.submitTitle.bind(this);
    this.editFlow = this.editFlow.bind(this);
    this.removeFlow = this.removeFlow.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  handleChange(event) {
    this.setState({
      titleInput: event.target.value
    })
  }

  login() {
    auth.signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        this.setState({
          user
        });
      }).then(() => {
        const itemsRef = firebase.database().ref('items');
        itemsRef.on('value', (snapshot) => {
          let items = snapshot.val();
          let newState = [];
          for (let item in items) {

            newState.push({
              id: item,
              flowTitle: items[item].flowTitle,
              flowOrder: items[item].flowOrder,
              sequenceColumn: items[item].sequenceColumn,
              creationDate: items[item].submissionTime
            });
          }
          this.setState({
            pastFlows: newState
          });
        });
      });
  }

  logout() {
    auth.signOut()
      .then(() => {
        this.setState({
          user: null
        });
      });
  }

  submitTitle(event) {
    event.preventDefault();
    console.log(this.state.titleInput);
    this.setState({
      titleInput: '',
      title: this.state.titleInput,
    });
  }

  showSidebar() {
    this.setState({
      sidebar: !this.state.sidebar,
    });
  }

  navigate = (e, id) => {
    this.setState({
      dashboard: id
    })
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
    const user = this.state.user.uid;

    const timeStamp = new Date();
    const timeString = timeStamp.toString();
    const itemsRef = firebase.database().ref(user);

    if (!this.state.title || this.state.columns['column-2'].poseIds.length === 0) {
      alert('oops!');
      return;
    }

    console.log(this.state.title, this.state.columns['column-2']);
    const flow = {
      flowTitle: this.state.title,
      flowOrder: this.state.flowInfo,
      sequenceColumn: this.state.columns['column-2'],
      submissionTime: timeString,
    }
    itemsRef.push(flow);
    alert('Flow Submitted!');
    this.setState({
      dashboard: 'pastsequences',
    });
  }

  editFlow(id) {
    const pastFlow = this.state.pastFlows[id];
    const column = pastFlow.sequenceColumn.id;
    console.log(pastFlow.flowOrder);
    const flowOrder = pastFlow.flowOrder;

    this.setState({
      title: pastFlow.flowTitle,
      flowInfo: flowOrder,
      columns: {
        ...this.state.columns,
        [column]: pastFlow.sequenceColumn,
      },
      dashboard: 'flowbuildr',
    });

  }

  removeFlow(id) {
    const itemRef = firebase.database().ref(`/items/${id}`);
    itemRef.remove();
  }

  setTitle(e) {
    console.log(e.target.value);
  }

  gatherFlows() {
    const itemsRef = firebase.database().ref('items');
    itemsRef.on('value', (snapshot) => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {

        newState.push({
          id: item,
          flowTitle: items[item].flowTitle,
          flowOrder: items[item].flowOrder,
          sequenceColumn: items[item].sequenceColumn,
          creationDate: items[item].submissionTime
        });
      }
      this.setState({
        pastFlows: newState
      });
    });
  }

  componentDidMount() {
    /* Keep user logged in */
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      }
    });

    const itemsRef = firebase.database().ref('items');
    itemsRef.on('value', (snapshot) => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {

        newState.push({
          id: item,
          flowTitle: items[item].flowTitle,
          flowOrder: items[item].flowOrder,
          sequenceColumn: items[item].sequenceColumn,
          creationDate: items[item].submissionTime
        });
      }
      this.setState({
        pastFlows: newState
      });
    });

  }


  onDragStart = () => {
    // Use this to determine if <Clone /> is needed
  };


  onDragUpdate = update => {

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
    document.body.style = bodyStyle;


    return (
    <React.Fragment>
    {(!this.state.user) && <Login user={this.state.user} login={this.login} />}

    {(this.state.sidebar === true) && <Dashboard getFlow={this.getFlow}  navigate={this.navigate} />}
    <div style={{display: (this.state.user ? 'block' : 'none') }} className={'container-fluid ' + (this.state.sidebar ? "Pushed" : "") }>
    <DashboardContainer className='row'  >
      <DashboardHeader sidebar={this.state.sidebar} logout={this.logout}  />
      <SwitchButton onClick={this.showSidebar} >
        <FaBars style={{ color: "#b3d7ff", height: 45, width: 40, padding: 10, cursor: 'pointer' }} />
      </SwitchButton>
        {this.state.dashboard === 'welcome' &&
          <Container>
            <Welcome />
          </Container> }

          {this.state.dashboard === 'flowbuildr' && <DragDropContext onDragStart={this.onDragStart} onDragUpdate={this.onDragUpdate} onDragEnd={this.onDragEnd}>
            <Container style={{position: 'relative'}}>
              {this.state.title === '' ? (<TitleForm onSubmit={this.submitTitle}>
                <input value={this.state.titleInput} onChange={this.handleChange} className='title-input' type="text" placeholder="name this flow" />
                <button className='btn btn-link' type='submit'>Save</button>
              </TitleForm>) : (
                <Title>{this.state.title} <FaEdit /></Title>
              )}

              { this.state.columnOrder.map(columnId => {
                const column = this.state.columns[columnId];
                let info = column.poseIds.map(poseId => this.state.info[poseId]);
                let flowInfo = column.poseIds.map(poseId => this.state.flowInfo[poseId]);

                if (columnId === 'column-1') {
                  return <Column key={column.id} column={column} info={info} addPose={this.addPose} />;
                } else if (columnId === 'column-2') {
                  return <Sequence key={column.id} column={column} info={flowInfo} removePose={this.removePose} addMultiplier={this.addMultiplier} increaseMultiplier={this.increaseMultiplier} decreaseMultiplier={this.decreaseMultiplier} />;
                }
              })}
              <SaveButton onClick={this.saveFlow}>
                <button className='btn btn-primary'>Save Flow</button>
              </SaveButton>
            </Container>
          </DragDropContext>
          }

          {this.state.dashboard === 'pastsequences' &&
            <Container style={{position: 'relative'}}>
              <PastSequences pastFlows={this.state.pastFlows} edit={this.editFlow} remover={this.removeFlow} />
              <SaveButton>
                <button className='btn btn-primary'>Display Flow</button>
              </SaveButton>
            </Container> }

      </DashboardContainer>
      </div>
    </React.Fragment>
  );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
