import React from 'react';
import ReactDOM from 'react-dom';
import '@atlaskit/css-reset';
import styled from 'styled-components';

export default class Multiplier extends React.Component {

  render() {


    return (
      <div count={this.props.multiplied}>
        <button>-</button>
        <span>{this.props.count}</span>
        <button>+</button>
      </div>
    );
  }
}
