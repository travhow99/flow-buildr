import React from 'react';
import ReactDOM from 'react-dom';
import '@atlaskit/css-reset';
import styled from 'styled-components';


const Header = styled.div`
  height: 272px;
  width: 100%;
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
        <div style={{padding: 40, width: '100%'}}>
          <h1 style={{color: 'rgb(143, 40, 177)'}}>flowbuildr</h1>
          <h3 style={{color: 'rgb(143, 40, 177)'}}>A yoga teacher's best friend</h3>
        </div>
      </Header>
    );
  }
}
