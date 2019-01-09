import React from 'react';
import ReactDOM from 'react-dom';
import '@atlaskit/css-reset';
import styled from 'styled-components';


const Sidebar = styled.div`
  margin-right: 8px;
  border-right: 1px solid lightgrey;
  max-width: 25%;
  display: flex;
  flex-direction: column;
  height: 100vh;
  min-height: 600px;
  background-color: dodgerblue;
  color: #fff;
`;

const Menu = styled.ul`
  list-style-type: none;
  padding: 10px;
`;

const Title = styled.h3`
  padding: 8px;
  box-shadow: 0px 1px 1px 0px black;
  z-index: 1;
`;
const PoseList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  flex-grow: 1;
  min-height: 100px;
  overflow-y: auto;
`; //  background-color: ${props => (props.isDraggingOver ? 'pink' : 'white')};

export default class Dashboard extends React.Component {

  render() {

    return (
      <Sidebar>
        <h3 style={{color: 'white'}}>flowbuildr</h3>
        <Menu>
          <li>Home</li>
          <li>New Sequence</li>
          <li>Past Sequences</li>
          <li>Pose Bank</li>
        </Menu>
      </Sidebar>
    );
  }
}
