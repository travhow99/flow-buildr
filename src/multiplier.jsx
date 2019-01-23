import React from 'react';
import ReactDOM from 'react-dom';
import '@atlaskit/css-reset';
import styled from 'styled-components';

// Need to create onClick functions for + and - to change this.props.multiplied
export default class Multiplier extends React.Component {

  render() {


    return (
      <div count={this.props.multiplied} style={{float: 'right'}}>
        <button>-</button>
        <button>+</button>
      </div>
    );
  }
}
