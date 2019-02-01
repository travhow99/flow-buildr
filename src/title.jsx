import React from 'react';
import ReactDOM from 'react-dom';
import '@atlaskit/css-reset';
import styled from 'styled-components';

const TitleDiv = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 200px;
`;

export default class Title extends React.Component {

  render() {
    console.log(this.props.value);
    return (
      <TitleDiv input={this.props.value} handleChange={this.props.handleChange}>
        <input className='title-input' type="text" placeholder="name this flow" />
        <button className='btn btn-link'>Save</button>
      </TitleDiv>
    );
  }
}
