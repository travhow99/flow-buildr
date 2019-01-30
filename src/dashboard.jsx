import React from 'react';
import ReactDOM from 'react-dom';
import '@atlaskit/css-reset';
import styled from 'styled-components';


const Sidebar = styled.div`
  margin-right: 8px;
  border-right: 1px solid lightgrey;
  width: 125px;
  position: absolute;
  left: 0;
  display: flex;
  flex-direction: column;
  height: 100vh;
  min-height: 600px;
  background-color: #6889a9;
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
          <li onClick={((e) => this.props.navigate(e, "welcome"))}>Home</li>
          <li onClick={((e) => this.props.navigate(e, "flowbuildr"))}>flowbuildr</li>
          <li onClick={((e) => this.props.navigate(e, "pastsequences"))}>Past Sequences</li>
          <li onClick={((e) => this.props.navigate(e, "posebank"))}>Pose Bank</li>
        </Menu>
      </Sidebar>
    );
  }
}
