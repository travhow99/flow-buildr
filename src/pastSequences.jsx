import React from 'react';
import styled from 'styled-components';
import firebase from './firebase.js'; // <--- add this line
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';

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
  bottom: 2px;
  right: 2px;
`;

const EditButton = styled(RemoveButton)`
  right: 36px;
`;


export default class PastSequences extends React.Component {

  render() {


    return (
      <section className='display-item'>
        <div className="wrapper">
            {this.props.pastFlows.map((item, key) => {
              return (
                  <PastFlow key={item.id} order={key} className='card'>
                    <h4>{item.flowTitle}</h4>
                    <small>{item.creationDate}</small>
                    <EditButton className="btn btn-sm btn-primary" onClick={() => this.props.edit(key)}>
                      <FaPencilAlt />
                    </EditButton>
                    <RemoveButton className="btn btn-sm btn-danger" onClick={() =>
                      window.confirm("Are you sure you wish to delete this item? This cannot be undone.") &&
                      this.props.remover(item.id)} >
                        <FaTrashAlt />
                      </RemoveButton>
                  </PastFlow>
              )
            })}
        </div>
      </section>
    );
  }
}
