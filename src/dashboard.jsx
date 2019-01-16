import React from 'react';
import ReactDOM from 'react-dom';
import '@atlaskit/css-reset';
import styled from 'styled-components';


const Sidebar = styled.div`
  margin-right: 8px;
  border-right: 1px solid lightgrey;
  max-width: 25%;
  position: absolute;
  left: 0;
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