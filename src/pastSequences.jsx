import React from 'react';
import styled from 'styled-components';
import firebase from './firebase.js'; // <--- add this line

const PastFlow = styled.div`
  position: relative;
  width: calc(25% - 4px);
  margin-right: 4px;
  margin-bottom: 4px;
  padding: 20px;
  border: 2px solid grey;
  display: inline-block;
  height: 160px;
  vertical-align: middle;
`;

const RemoveButton = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
`;


export default class PastSequences extends React.Component {

  render() {


    return (
      <section className='display-item'>
        <div className="wrapper">
            {this.props.pastFlows.map((item) => {
              return (
                  <PastFlow key={item.id} className='card'>
                    <h4>{item.flowTitle}</h4>
                    <small>{item.creationDate}</small>
                    <RemoveButton className="btn btn-danger" onClick={() => this.props.remover(item.id)} >X</RemoveButton>
                  </PastFlow>
              )
            })}
        </div>
      </section>
    );
  }
}
