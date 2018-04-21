import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import $ from 'jquery';

import { requestVideoSearch } from '../../actions/search_actions';

import VideoIndexItem from './video_index_item';
import SearchBar from '../search/search_bar';
import Player from '../player/player';

class PlaylistShow extends Component {
  constructor(props) {
    super(props);

    this.state = { playlistIdx: 0,
                   startSearchIdx: 0,
                   disableSearchLeft: true,
                   disableSearchRight: false }


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

  setSearchIdx(event, direction) {
    if (event) {
      event.preventDefault();
    }

    const { startSearchIdx, disableSearchLeft } = this.state;
    const searchedIndexLength = this.props.allSearchedIds.length;
    const netChange = (direction === 'left') ? -5 : 5;
    const remainingIdxItems = searchedIndexLength - startSearchIdx - netChange;
    const stateChanges = {};

    if (direction === 'right' && (remainingIdxItems > netChange)) {
      stateChanges['disableSearchLeft'] = false;
      stateChanges['startSearchIdx'] = startSearchIdx + netChange;
    } else if (remainingIdxItems <= netChange) {
      stateChanges['disableSearchRight'] = true;
      stateChanges['startSearchIdx'] = startSearchIdx + netChange;
    } else if (direction === 'left' && (startSearchIdx + netChange <= 0)) {
      stateChanges['disableSearchLeft'] = true;
      stateChanges['startSearchIdx'] = startSearchIdx + netChange;
    } else if (direction === 'left') {
      stateChanges['disableSearchRight'] = false;
      stateChanges['startSearchIdx'] = startSearchIdx + netChange;
    }

    this.setState(stateChanges);
  }

  render() {
    const { searchedById, allSearchedIds, playlist } = this.props;
    const { playlistIdx, startSearchIdx } = this.state;

    const currVideoObj = playlist[playlistIdx];
    const currVideoId = (currVideoObj) ? currVideoObj.id : null;

    const SearchedIndex = allSearchedIds.slice(startSearchIdx, startSearchIdx + 5)
                                        .map(videoId => (
      <li className="searched-item">
        <VideoIndexItem key={videoId}
                        buttonFn={this.addVid}
                        video={searchedById[videoId]}
                        buttonDisplay="Add to Playlist" />
      </li>
    ))

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

        <div className='searched'>
          <h1> { this.props.allSearchedIds.length }</h1>
          <SearchBar requestVideoSearch={this.props.requestVideoSearch} />
          <button onClick={ (e) => this.setSearchIdx(e, 'left') }
                  disabled={this.state.disableSearchLeft}
                  className="nav-btn" >
            LEFT
          </button>
          <ul>
            { SearchedIndex }
          </ul>

          <button onClick={ (e) => this.setSearchIdx(e, 'right') }
                  disabled={this.state.disableSearchRight}
                  className="nav-btn" >
            RIGHT
          </button>

        </div>
      </div>
    );
  }
}

export default PlaylistShow;
