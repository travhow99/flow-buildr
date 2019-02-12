import React from 'react';
import ReactDOM from 'react-dom';
import '@atlaskit/css-reset';
import styled from 'styled-components';
import { FaUserCircle } from 'react-icons/fa';


const Header = styled.div`
  height: 272px;
  width: 100%;
  background-color: #6889a9;
`;

const Menu = styled.ul`
  list-style-type: none;
  padding: 10px;
`;

const profile = {
  right: 10,
  top: 10,
  position: 'absolute',
  color: 'white'
}

const userStyles = {
  fontSize: 40,
}

export default class DashboardHeader extends React.Component {

  render() {
    const userName = this.props.userName.split(' ')[0];

    return (
      <Header style={{left: this.props.sidebar ? 125 :  0}}>
        <div style={{padding: 40, width: '100%'}}>
          <h1 style={{color: '#b3d7ff'}}>flowbuildr</h1>
          <h3 style={{color: '#fff'}}>A yoga teachers best friend</h3>
          <div style={profile}>
            <span style={{float: 'left', marginRight: 12}}>Welcome,<br />
            {userName}</span>
            <FaUserCircle style={userStyles} /><br />
            <button className='btn btn-sm' onClick={this.props.logout}>Log Out</button>
          </div>
        </div>
      </Header>
    );
  }
}
