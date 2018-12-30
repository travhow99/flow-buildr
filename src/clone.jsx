import React from 'react';
import styled from 'styled-components';
import { FaInfoCircle } from 'react-icons/fa';



export default class Clone extends React.Component {
  render() {
    const url = urlGenerator(this.props.pose.english_name);

    const parent = this.props.parent;
    console.log(parent);

    return (

      {this.props.pose.english_name}
      <PosePic>
      CLONE
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
    )
  }
}



function urlGenerator(pose) {
  const baseUrl = 'https://www.yogajournal.com/poses/search?query=';

  let corrected = pose.replace(' ', '%20');
  let finalUrl = baseUrl + corrected;
  return finalUrl;

}
