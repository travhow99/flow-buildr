import React from 'react';
import ReactDOM from 'react-dom';
import '@atlaskit/css-reset';
import styled from 'styled-components';

const Container = styled.div`
  display: inline-block;
`;

const Search = styled.input`

`;

export default class PoseSearch extends React.Component {

  render() {

    return (
      <Container>
        <Search />
      </Container>
    );
  }
}
