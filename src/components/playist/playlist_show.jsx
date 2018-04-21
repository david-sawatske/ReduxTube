import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';

import { requestVideoSearch } from '../../actions/search_actions';

import SearchedIndex from '../search/searched_index';
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
    this.props.addVideo(video);
  }

  removeVid(event, video) {
    event.preventDefault();
    this.props.removeVideo(video);
  }

  setVidIdx(event, newVidIdx) {
    if (event) {
      event.preventDefault();
    }

    this.setState({ playlistIdx: newVidIdx });
  }

  render() {
    const { searchedById, allSearchedIds, playlist } = this.props;
    const { playlistIdx } = this.state;

    const currVideoObj = playlist[playlistIdx];
    const currVideoId = (currVideoObj) ? currVideoObj.id : null;

    let WillPlayIndex;
    let HasPlayedIndex;
    if (playlist.length > 0) {
      const afterPlaying = playlist.slice(0, playlistIdx)
      const beforePlaying = playlist.slice(playlistIdx + 1)

      WillPlayIndex = beforePlaying.map(video => (
        <li ref="hovered">
          <VideoIndexItem video={video}
                          key={video.etag}
                          buttonDisplay="Remove"
                          buttonFn={this.removeVid}
                          setVidIdx={this.setVidIdx}
                          videoIdx={playlist.indexOf(video)} />
        </li>
      )),
      HasPlayedIndex =
      afterPlaying.map(video => (
        <li>
          <VideoIndexItem video={video}
                          key={video.etag}
                          buttonDisplay="Remove"
                          buttonFn={this.removeVid}
                          setVidIdx={this.setVidIdx}
                          videoIdx={playlist.indexOf(video)} />
        </li>
      ))
    }

    let SearchedIdxDisplay
    if (allSearchedIds.length > 0) {
      SearchedIdxDisplay = <SearchedIndex searchedById={searchedById}
                                     allSearchedIds={allSearchedIds} />
    }

    const LivePlayer = <div className='player'>
                         <Player videoId={currVideoId}
                                 currentIndex={playlistIdx}
                                 setVidIdx={this.setVidIdx} />
                       </div>

    return (
      <div className='playlist-container'>
        <div className='player'>
          { LivePlayer }
        </div>

        <div className='will-play'>
          <ul>
            { WillPlayIndex }
          </ul>
        </div>

        <div className='has-played'>
          <ul>
            { HasPlayedIndex }
          </ul>
        </div>

        <SearchBar requestVideoSearch={this.props.requestVideoSearch} />

        { SearchedIdxDisplay }
      </div>
    );
  }
}

export default PlaylistShow;
