import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  float: right;
  background: dodger-blue;
`;

export default class SaveButton extends React.Component {

  render() {


    return (
        <Button>Save Flow</Button>
    );
  }
}
