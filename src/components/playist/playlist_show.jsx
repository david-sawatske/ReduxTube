import React, { Component } from 'react';

import { requestVideoSearch } from '../../actions/search_actions';

import VideoIndexItem from './video_index_item';
import SearchBar from '../search/search_bar';

class PlaylistShow extends Component {
  constructor(props) {
    super(props);

    this.state = { }

    this.addVid = this.addVid.bind(this);
    this.removeVid = this.removeVid.bind(this);
  }

  addVid(event, video) {
    event.preventDefault();
    this.props.addVideo(video)
  }

  removeVid(event, video) {
    event.preventDefault();
    this.props.removeVideo(video)
  }

  render() {
    const { searchedById, allSearchedIds } = this.props;

    const SearchedIndex = Object.keys(searchedById)
                                .slice(0, 10)
                                .map(videoId => (
      <li className="searched-item">
        <VideoIndexItem key={videoId}
                        video={searchedById[videoId]} />
      </li>
    ))

    return (
      <div id='base-container'>
        <SearchBar requestVideoSearch={this.props.requestVideoSearch} />
        <div className='searched'>
          <h1>Searched</h1>
          <h2>byId: {Object.keys(searchedById).length}</h2>
          <h2>allIds: {allSearchedIds.length}</h2>
          <ul>
            { SearchedIndex }
          </ul>
        </div>
      </div>
    );
  }
}

export default PlaylistShow;
