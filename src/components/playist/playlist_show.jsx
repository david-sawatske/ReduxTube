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

    this.state = { playlistIdx: 0,
                   willPlayText: 'View All',
                   willPlayClass: 'will-play' }

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

  toggleWillPlayClass(event) {
    event.preventDefault();

    const { willPlayClass } = this.state;
    const nextClass = (willPlayClass === 'will-play') ? 'will-play-all'
                                                         :
                                                        'will-play';
    let clickText = 'View All'
    if (willPlayClass === 'will-play') {
       clickText = '✘'
    }

    this.setState({ willPlayClass: nextClass,
                    willPlayText: clickText })
  }

  render() {
    const { searchedById, allSearchedIds, playlist } = this.props;
    const { playlistIdx, willPlayClass, willPlayText } = this.state;

    const currVideoObj = playlist[playlistIdx];
    const currVideoId = (currVideoObj) ? currVideoObj.id : null;

    let WillPlayIndex;
    let HasPlayedIndex;
    if (playlist.length > 0) {
      const afterPlaying = playlist.slice(0, playlistIdx);
      const beforePlaying = playlist.slice(playlistIdx + 1, playlistIdx + 11);
      const iconId = "v1524351089/trash_lqysey.png";

      WillPlayIndex = beforePlaying.map(video => (
        <li ref="hovered">
          <VideoIndexItem video={video}
                          key={video.id}
                          iconId={iconId}
                          buttonFn={this.removeVid}
                          setVidIdx={this.setVidIdx}
                          videoIdx={playlist.indexOf(video)} />
        </li>
      )),
      HasPlayedIndex =
      afterPlaying.map(video => (
        <li>
          <VideoIndexItem video={video}
                          key={video.id}
                          iconId={iconId}
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

        <div className={willPlayClass} >
          <ul>
            { WillPlayIndex }
          </ul>

          <div className='class-toggle'
               onClick={ (e) => this.toggleWillPlayClass(e) }>
            <h1 >{ willPlayText }</h1>
          </div>
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
