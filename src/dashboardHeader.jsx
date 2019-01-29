import React from 'react';
import ReactDOM from 'react-dom';
import '@atlaskit/css-reset';
import styled from 'styled-components';


const Header = styled.div`
  position: absolute;
  z-index: 0;
  left: 0;
  right: 0;
  height: 200px;
  background-color: #86c3ff;
`;

const Menu = styled.ul`
  list-style-type: none;
  padding: 10px;
`;

export default class DashboardHeader extends React.Component {

  render() {

    return (
      <Header style={{left: this.props.sidebar ? 125 :  0}}>
        <div style={{padding: 40, maxWidth: '100%'}}>
          <h1>flowbuildr</h1>
          <h3>A yoga teacher's best friend</h3>
        </div>
      </Header>
    );
  }
}
