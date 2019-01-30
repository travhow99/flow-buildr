import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  position: absolute;
  right: 20px;
  bottom: 15px;
`;

export default class SaveButton extends React.Component {

  render() {


    return (
        <Button>Save Flow</Button>
    );
  }
}
