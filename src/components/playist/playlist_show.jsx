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
    this.props.addVideo(video);
  }

  removeVid(event, video) {
    event.preventDefault();
    this.props.removeVideo(video);
  }

  setVidIdx(event, newVidIdx) {
    event.preventDefault();

    this.setState({ playlistIdx: newVidIdx });
  }

  render() {
    const { searchedById, allSearchedIds, playlist } = this.props;
    const { playlistIdx } = this.state;

    const currVideoObj = playlist[playlistIdx];
    const currVideoId = (currVideoObj) ? currVideoObj.id : null;

    const SearchedIndex = allSearchedIds.slice(0, 10)
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
        <li>
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
                         <h1>Player</h1>
                         <Player currentIndex={playlistIdx}
                                 setVidIdx={this.setVidIdx}
                                 videoId={currVideoId} />
                       </div>

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

        <div className='will-play'>
          <h1>BEFORE Playlist</h1>
          <ul>
            { WillPlayIndex }
          </ul>
        </div>

        <div className='has-played'>
          <h1>AFTER Playlist</h1>
          <ul>
            { HasPlayedIndex }
          </ul>
        </div>
      </div>
    );
  }
}

export default PlaylistShow;
