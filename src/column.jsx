import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import Pose from './pose';

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 280px;
  display: flex;
  flex-direction: column;
  height: 80vh;
  min-height: 600px;
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
  overflow-y: auto;
`; //  background-color: ${props => (props.isDraggingOver ? 'pink' : 'white')};

export default class Column extends React.Component {

  render() {
// Create second <Droppable /> for sequence
  console.log(this.props.info);

    return (
      <Container>
        <Title>{this.props.column.title}</Title>
        <Droppable droppableId='column-1' isDropDisabled={true}>
          {(provided, snapshot) => (
            <PoseList
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {this.props.info.map((pose, index) => (
                <Pose key={pose.id} pose={pose} index={index} parent='column-1'/>
              ))}
              {provided.placeholder}
            </PoseList>
          )}
        </Droppable>
      </Container>
    );
  }
}
