import React, { Component } from 'react';

import { requestVideoSearch } from '../../actions/search_actions';

import VideoIndexItem from './video_index_item';
import SearchBar from '../search/search_bar';
import Player from '../player/player';

class PlaylistShow extends Component {
  constructor(props) {
    super(props);

    this.state = { playlistIdx: 0 }

    this.addVid = this.addVid.bind(this);
    this.removeVid = this.removeVid.bind(this);
    this.setVidIdx = this.setVidIdx.bind(this);
  }

  addVid(event, video) {
    event.preventDefault();
    this.props.addVideo(video)
  }

  removeVid(event, video) {
    event.preventDefault();
    this.props.removeVideo(video)
  }

  setVidIdx(newVidIdx, event) {
    this.setState({ playlistIdx: newVidIdx })
  }

  render() {
    const { searchedById, allSearchedIds, playlist } = this.props;

    const SearchedIndex = allSearchedIds.slice(0, 10)
                                        .map(videoId => (
      <li className="searched-item">
        <VideoIndexItem key={videoId}
                        buttonFn={this.addVid}
                        video={searchedById[videoId]}
                        buttonDisplay="Add to Playlist" />
      </li>
    ))

    const PlaylistIndex = playlist.map(video => (
      <li className="searched-item">
        <VideoIndexItem key={video.id}
                        video={video}
                        buttonFn={this.removeVid}
                        buttonDisplay="Remove from Playlist" />
      </li>
    ))

    let LivePlayer
    const { playlistIdx } = this.state;
    if (playlist[playlistIdx]) {
      LivePlayer = <div className='player'>
                     <h1>Player</h1>
                     <Player currentIndex={playlistIdx}
                             setVidIdx={this.setVidIdx}
                             videoId={playlist[playlistIdx].id} />
                   </div>
    }

    return (
      <div className='playlist-container'>
        <div className='player'>
          { LivePlayer }
        </div>

        <SearchBar requestVideoSearch={this.props.requestVideoSearch} />
        <div className='searched'>
          <h1>Searched</h1>
          <h2>byId: {Object.keys(searchedById).length}</h2>
          <h2>allIds: {allSearchedIds.length}</h2>
          <ul>
            { SearchedIndex }
          </ul>
        </div>

        <div className='playlist'>

          <h1>Playlist</h1>
          <ul>
            { PlaylistIndex }
          </ul>
        </div>
      </div>
    );
  }
}

export default PlaylistShow;
