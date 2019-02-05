import React from 'react';
import ReactDOM from 'react-dom';
import '@atlaskit/css-reset';
import styled from 'styled-components';
import GoogleButton from 'react-google-button'

const LoginPortal = styled.div`
  position: absolute;
  background: #446077;
  width: 420px;
  height: 300px;
  color: white;
  left: 0;
  right: 0;
  margin: 60px auto;
`;

const center = {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    bottom: 20,
  }


export default class Login extends React.Component {

  render() {
    return (
    <LoginPortal>
    {this.props.user ?
      <GoogleButton onClick={this.props.logout}>Log Out</GoogleButton>
      :
      <GoogleButton style={center} onClick={this.props.login}>Log In</GoogleButton>
    }
    </LoginPortal>
    );
  }
}
