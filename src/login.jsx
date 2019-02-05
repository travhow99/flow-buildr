import React from 'react';
import ReactDOM from 'react-dom';
import '@atlaskit/css-reset';
import styled from 'styled-components';
import GoogleButton from 'react-google-button'

const LoginPortal = styled.div`
  position: absolute;
  background: #fff;
  width: 272px;
  height: 300px;
  left: 0;
  right: 0;
  margin: 120px auto;
  padding: 20px 12px;
  border: 2px solid #446077;
  border-radius: 5px;
  box-shadow: 0 1px 4px rgba(0,0,0,.06);
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
    <h1>flowBuildr</h1>
    <p className='lead'>Login to get started, or checkout a demo!</p>
    {this.props.user ?
      <GoogleButton onClick={this.props.logout}>Log Out</GoogleButton>
      :
      <GoogleButton style={center} onClick={this.props.login}>Log In</GoogleButton>
    }
    </LoginPortal>
    );
  }
}
