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

export default class SidebarSwitch extends React.Component {

  render() {


    return (
      <SwitchButton onClick={this.props.showDashboard}>

      </SwitchButton>
    );
  }
}
