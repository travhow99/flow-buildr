import React from 'react';
import styled from 'styled-components';
import Multiplier from './multiplier';
import { Draggable } from 'react-beautiful-dnd';
import { FaInfoCircle, FaPlusCircle, FaMinusCircle, FaTimesCircle, FaRedo } from 'react-icons/fa';
import Pluralize from 'react-pluralize';


const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${props => (props.isDragging ? 'lightblue' : 'white')};
  position: relative;
  z-index: 1;
`;

const Clone = styled(Container)`
  + div {
    display: none!important;
  }
`;

const Repeater = styled(Container)`
  margin-top: -14px;
  z-index: 0;
  background: purple;
  color: beige;
  border-radius: 0 0 8px 8px;
`;

const Sanskrit = styled.div`
  font-size: 10px;
  font-style: italic;
`;

const PosePic = styled.div`
  float: right;
  width: 30px;
  height: 30px;
  padding: 3px;
  border: 1px #c7c3c3 solid;
  background-color: #c7c3c3;
  border-radius: 50%;
  margin-right: 15px;
`;

const Info = styled.span`
  float: right;
  width: 15px;
  height: 15px;
  color: blue;
`;

const ButtonContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  background: orange;
`;

// Potentially add <Handle > for draghandle, video #8

/* Pull <Clone > out to its own component to be conditionally renderd */

export default class Pose extends React.Component {
  render() {
    const url = urlGenerator(this.props.pose.english_name);

    const parent = this.props.parent;

    return (
      <Draggable draggableId={this.props.pose.id} index={this.props.index} multiplied={this.props.multiplied} >
      {(provided, snapshot) => (
        <React.Fragment>
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
          {this.props.pose.english_name}
          {parent === "column-1" && !snapshot.isDragging &&
            <ButtonContainer>
              <FaPlusCircle style={{ color: "white", height: 18, width: 18, padding: 1, cursor: "pointer", position: "relative", top: "50%", transform: "translateY(-50%)" }} onClick={((e) => this.props.addPose(e, this.props.index))}/>
            </ButtonContainer>
            }
            {/* Remove & multiply button for column-2 */}
            {parent === "column-2" && !snapshot.isDragging &&
            <React.Fragment>
                <ButtonContainer style={{background: "red", height: "50%"}}>
                  <FaMinusCircle style={{ color: "white", height: 18, width: 18, padding: 1, cursor: "pointer", position: "relative", top: "50%", transform: "translateY(-50%)" }} onClick={((e) => this.props.removePose(e, this.props.index)) }/>
                </ButtonContainer>
                <ButtonContainer style={{background: this.props.multiplied === 0 ? "purple" : "#78ff23", height: "50%", bottom: 0, top: "50%"}}>
                  {this.props.multiplied === 0 && <FaTimesCircle style={{ color: "white", height: 18, width: 18, padding: 1, cursor: "pointer", position: "relative", top: "50%", transform: "translateY(-50%)" }} onClick={((e) => this.props.addMultiplier(e, this.props.pose.id))} multiplied={this.props.multiplied}/> }
                </ButtonContainer>
              </React.Fragment>
              }
            <PosePic>
              <img src={this.props.pose.img_url} alt={this.props.pose.english_name} />
            </PosePic>
            <div>
              <a href={url} target="_blank" rel="noopener noreferrer">
                <FaInfoCircle style={{ color: "lightblue", float: "left" }} />
              </a>
            </div>
            <Sanskrit>
              {this.props.pose.sanskrit_name}
            </Sanskrit>
          </Container>
          {this.props.multiplied > 0 && !snapshot.isDragging &&
            /* Break into multiplier component */
            <Repeater>
              <FaRedo style={{ verticalAlign: "text-bottom" }} /> <strong>{this.props.multiplied}</strong> <Pluralize singular={'time'} count={this.props.multiplied} showCount={false}/>
              <Multiplier multiplied={this.props.multiplied}
              id={this.props.pose.id} increaseMultiplier={this.props.increaseMultiplier}
              decreaseMultiplier={this.props.decreaseMultiplier} />
            </Repeater>
          }
          {parent === 'column-1' && snapshot.isDragging && (
            <Clone>
              {this.props.pose.english_name}
              <ButtonContainer>
                <FaPlusCircle style={{ color: "white", height: 18, width: 18, padding: 1, cursor: "pointer", position: "relative", top: "50%", transform: "translateY(-50%)" }} onClick={((e) => this.props.addPose(e, this.props.index))}/>
              </ButtonContainer>
              <PosePic>
                <img src={this.props.pose.img_url} alt={this.props.pose.english_name} />
              </PosePic>
              <div>
                <a href={url} target="_blank" rel="noopener noreferrer">
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
