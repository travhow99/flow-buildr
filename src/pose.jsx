import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { FaInfoCircle } from 'react-icons/fa';
import uuid from 'uuid/v4';


const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${props => (props.isDragging ? 'lightblue' : 'white')};
`;

const Clone = styled(Container)`
  + div {
    display: none!important;
  }
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

/* Pull <Clone > out to its own component to be conditionally renderd */

export default class Pose extends React.Component {
  render() {
    const url = urlGenerator(this.props.pose.english_name);

    const parent = this.props.parent;



    return (
      <Draggable draggableId={this.props.pose.id} index={this.props.index} >
      {(provided, snapshot) => (
        <React.Fragment>
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
          {this.props.pose.english_name}
            <PosePic>
              <img src={this.props.pose.img_url} />
            </PosePic>
            <div>
              <a href={url} target="_blank">
                <FaInfoCircle style={{ color: "lightblue", float: "left" }} />
              </a>
            </div>
            <Sanskrit>
              {this.props.pose.sanskrit_name}
            </Sanskrit>
          </Container>
          {parent === 'column-1' && snapshot.isDragging && (
            <Clone>
              {this.props.pose.english_name}
              <PosePic>
                <img src={this.props.pose.img_url} />
              </PosePic>
              <div>
              CLONE
                <a href={url} target="_blank">
                  <FaInfoCircle style={{ color: "lightblue", float: "left" }} />
                </a>
              </div>
              <Sanskrit>
                {this.props.pose.sanskrit_name}
              </Sanskrit>
            </Clone>
          )}

        </React.Fragment>
      )}
      </Draggable>
    );
  }
}

const urlGenerator = (pose) => {
  const baseUrl = 'https://www.yogajournal.com/poses/search?query=';

  let corrected = pose.replace(' ', '%20');
  let finalUrl = baseUrl + corrected;
  return finalUrl;

}
