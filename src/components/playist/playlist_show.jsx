import React, { Component } from 'react';

import { requestVideoSearch } from '../../actions/search_actions';

import SearchBar from '../search/search_bar';

class VideoShow extends Component {
  constructor(props) {
    super(props);

    this.state = { }
  }

  render() {
    console.log(this.props.searched);
    console.log(this.props.playlist);
    return (
      <div id='base-container'>
        <SearchBar requestVideoSearch={this.props.requestVideoSearch} />
      </div>
    );
  }
}

export default VideoShow;
