import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import Pose from './pose';

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radiius: 2px;
  width: 220px;

  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  padding: 8px;
`;
const PoseList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${props => (props.isDraggingOver ? 'pink' : 'white')};
  flex-grow: 1;
  min-height: 100px;
`;

export default class Column extends React.Component {

  render() {


    return (
      <Container>
        <Title>{this.props.column.title}</Title>
        <Droppable droppableId={this.props.column.id} isDropDisabled={this.props.column.id === 'column-1' ? true : false}>
          {(provided, snapshot) => (
            <PoseList
              ref={provided.innerRef}
              innerRef={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {this.props.info.map((pose, index) => (
                <Pose key={pose.id} pose={pose} index={index} />
                //console.log(pose)
              ))}
              {provided.placeholder}
            </PoseList>
          )}
        </Droppable>
      </Container>
    );
  }
}
