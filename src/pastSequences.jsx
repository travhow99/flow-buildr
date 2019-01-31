import React from 'react';
import styled from 'styled-components';
import firebase from './firebase.js'; // <--- add this line



export default class PastSequences extends React.Component {

  render() {


    return (
      <section className='display-item'>
        <div className="wrapper">
          <ul>
            {this.props.pastFlows.map((item) => {
              return (
                <li key={item.id}>
                  <p>created: {item.creationDate}</p>
                </li>
              )
            })}
          </ul>
        </div>
      </section>
    );
  }
}
