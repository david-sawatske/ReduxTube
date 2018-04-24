import React, { Component } from 'react';

import VideoIndexItem from '../playist/video_index_item';

class SearchedIndex extends Component {
  constructor(props) {
    super(props);

    this.state = { startSearchIdx: 0,
                   disableSearchLeft: true,
                   disableSearchRight: false };
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
    const { searchedById, allSearchedIds,
            searchIdxClass, buttonFn } = this.props;
    const {startSearchIdx } = this.state;
    const iconId = "v1524351088/add_rm9k9r.png";

    let SearchedItems = allSearchedIds.slice(startSearchIdx, startSearchIdx + 5)
                                      .map(videoId => (
      <li className="searched-item">
        <VideoIndexItem video={searchedById[videoId]}
                        buttonFn={buttonFn}
                        iconId={iconId}
                        key={videoId} />
      </li>
    ))

    return (
      <div className={searchIdxClass}>
        <button onClick={ (e) => this.setSearchIdx(e, 'left') }
                disabled={this.state.disableSearchLeft}
                className="nav-left" >
          ◀
        </button>
        <ul className='searched-index'>
          { SearchedItems }
        </ul>

        <button onClick={ (e) => this.setSearchIdx(e, 'right') }
                disabled={this.state.disableSearchRight}
                className="nav-right" >
          ▶
        </button>
      </div>
    );
  }

}

export default SearchedIndex;
