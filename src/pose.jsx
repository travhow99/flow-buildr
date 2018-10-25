import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { FaInfoCircle } from 'react-icons/fa';

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${props => (props.isDragging ? 'lightblue' : 'white')};
`;

const Sanskrit = styled.div`
  font-size: 10px;
  font-style: italic;
`;

const PosePic = styled.div`
  float: right;
  width: 25px;
  height: 25px;
  padding: 4px;
  border: 1px #c7c3c3 solid;
  background-color: #c7c3c3;
  border-radius: 50%;
`;

const Info = styled.span`
  float: right;
  width: 15px;
  height: 15px;
  color: blue;

`;

// Potentially add <Handle > for draghandle, video #8

export default class Pose extends React.Component {
  render() {
    return (
      <Draggable draggableId={this.props.pose.id} index={this.props.index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          innerRef={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          {this.props.pose.english_name}
          <PosePic>
            <img src={this.props.pose.img_url} />
          </PosePic>
          <div>
            <FaInfoCircle style={{ color: "lightblue", float: "left" }} />
          </div>
          <Sanskrit>
            {this.props.pose.sanskrit_name}
          </Sanskrit>
        </Container>
      )}
      </Draggable>
    );
  }
}
