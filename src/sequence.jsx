import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import Pose from './pose';
import uuid from 'uuid/v4';

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 280px;
  display: flex;
  flex-direction: column;
  max-height: 80vh;
`;

const Title = styled.h3`
  padding: 8px;
  box-shadow: 0px 1px 1px 0px black;
  z-index: 1;
`;
const PoseList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  flex-grow: 1;
  min-height: 100px;
  overflow-y: scroll;
`; //  background-color: ${props => (props.isDraggingOver ? 'pink' : 'white')};

export default class Column extends React.Component {

  render() {
// Create second <Droppable /> for sequence
    console.log(this.props);
    return (
      <Container>
        <Title>Flow</Title>
        <Droppable droppableId='column-2'>
          {(provided, snapshot) => (
            <PoseList
              ref={provided.innerRef}
              innerRef={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {this.props.info.map((pose, index) => (
                <Pose key={uuid()} pose={pose} index={index} parent='column-2'/>
              ))}
              {provided.placeholder}
            </PoseList>
          )}
        </Droppable>
      </Container>
    );
  }
}
