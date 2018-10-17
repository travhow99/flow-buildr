import React from 'react';
import styled from 'styled-components';
import Pose from './pose';

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radiius: 2px;
`;
const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div`
  padding: 8px;
`;

export default class Column extends React.Component {
  render() {
    return (
      <Container>
        <Title>{this.props.column.title}</Title>
        <TaskList>
          {this.props.poses.map(pose => <Pose key={pose.id} pose={pose} />)}
        </TaskList>
      </Container>
    );
  }
}
