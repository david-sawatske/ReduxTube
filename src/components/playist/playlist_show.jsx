import React, { Component } from 'react';

import { requestVideoSearch } from '../../actions/search_actions';

import SearchedIndex from '../search/searched_index';
import VideoIndexItem from './video_index_item';
import SearchBar from '../search/search_bar';
import Player from '../player/player';

class PlaylistShow extends Component {
  constructor(props) {
    super(props);

    this.state = { playlistIdx: 0,
                   searchIdxText: 'Hide Results',
                   searchIdxClass: 'searched-hide',
                   willPlayText: 'View All',
                   willPlayClass: 'will-play' }

    this.addVid = this.addVid.bind(this);
    this.removeVid = this.removeVid.bind(this);
    this.setVidIdx = this.setVidIdx.bind(this);
    this.setSearchIdxClass = this.setSearchIdxClass.bind(this);
  }

  addVid(event, video) {
    event.preventDefault();
    this.props.addVideo(video);
  }

  removeVid(event, video) {
    event.preventDefault();
    this.props.removeVideo(video);
  }

  clearPlaylist(event) {
    event.preventDefault();
    this.props.populatePlaylist([]);
  }

  clearSearch(event) {
    event.preventDefault();
    this.props.clearVideoSearch();
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

  setSearchIdxClass(event, booShow) {
    if (booShow) {
      this.setState({ searchIdxClass: 'searched-show' })
      return
    }

    event.preventDefault();

    const { searchIdxClass } = this.state;
    const nextClass = (searchIdxClass === 'searched-show') ? 'searched-hide'
                                                              :
                                                             'searched-show';
     let clickText = 'Show Results'
     if (searchIdxClass === 'searched-hide') {
        clickText = 'Hide Results'
     }

    this.setState({ searchIdxClass: nextClass,
                    searchIdxText: clickText })
  }

  render() {
    const { searchedById, allSearchedIds, playlist,
            populatePlaylist, clearVideoSearch } = this.props;
    const { playlistIdx, willPlayClass, willPlayText,
            searchIdxText, searchIdxClass } = this.state;

    const currVideoObj = playlist[playlistIdx];
    const currVideoId = (currVideoObj) ? currVideoObj.id : 'XEfDYMngJeE';


    let WillPlayIndex = <h3>Add to playlist by searching below</h3>;
    let HasPlayedIndex = <h3>List Empty</h3>;

    let PlaylistReset;
    let WillPlayClassToggle;
    if (playlist.length > 0) {
      const afterPlaying = playlist.slice(0, playlistIdx);
      const beforePlaying = (willPlayClass === 'will-play') ?
                              playlist.slice(playlistIdx + 1, playlistIdx + 11)
                               :
                              playlist.slice(playlistIdx + 1)

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
      )),
      WillPlayClassToggle = <div className='class-toggle'
                                 onClick={ (e) => this.toggleWillPlayClass(e) }>
                              <h1>{ willPlayText }</h1>
                            </div>
      PlaylistReset = <button className='playlist-reset'
                              onClick={ (e) => this.clearPlaylist(e) }>
                        Clear Playlist
                      </button>
    }

    if (( playlist.length - 1 ) === playlistIdx) {
      WillPlayClassToggle = null;
    }

    let SearchReset;
    let ShowSearchIdxBtn
    let SearchedIdxDisplay
    if (allSearchedIds.length > 0) {
      SearchedIdxDisplay = <SearchedIndex searchIdxClass={searchIdxClass}
                                          allSearchedIds={allSearchedIds}
                                          searchedById={searchedById}
                                          buttonFn={this.addVid} />

      ShowSearchIdxBtn =  <button className='search-idx-btn'
                                  onClick={ (e) => this.setSearchIdxClass(e) } >
                            { searchIdxText}
                          </button>

      SearchReset = <button className='search-reset'
                            onClick={ (e) => this.clearSearch(e) }>
                      Clear Search
                    </button>
    }

    const isWelcome = ( currVideoObj ) ? false : true;
    const LivePlayer = <div className='player'>
                         <Player populatePlaylist={populatePlaylist}
                                 currentIndex={playlistIdx}
                                 setVidIdx={this.setVidIdx}
                                 isWelcome={isWelcome}
                                 videoId={currVideoId} />
                       </div>;
    return (
      <div className='playlist-container'>
        { LivePlayer }

        <div className={willPlayClass} >
          <h2 className='will-play-heading'>Coming Up</h2>
          <ul>
            { WillPlayIndex }
          </ul>

          { WillPlayClassToggle }
        </div>

        <div className='has-played'>
          <div className='has-played-overlay'>
            <h2>Recently Played</h2>
          </div>
          <ul>
            { HasPlayedIndex }
          </ul>
        </div>

        { SearchReset }
        { PlaylistReset }

        <SearchBar setSearchIdxClass={this.setSearchIdxClass}
                   requestVideoSearch={this.props.requestVideoSearch} />

        { ShowSearchIdxBtn }
        { SearchedIdxDisplay }
      </div>
    );
  }
}

export default PlaylistShow;
