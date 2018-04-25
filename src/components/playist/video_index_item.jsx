import React, { Component } from 'react';

class VideoIndexItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { video, setVidIdx, videoIdx, buttonFn, iconId } = this.props;
    const iconURLBase = `http://res.cloudinary.com/sawatskeda10/image/upload/`;
    const iconURL = iconURLBase + iconId;

    let PlayNow
    if (setVidIdx) {
      PlayNow = <img alt='play'
                     className='play'
                     onClick={ (e) => setVidIdx(e, videoIdx) }
                     src={ iconURLBase + 'v1524672709/yt-play_jlajhz.png'} />
    }

    return (
      <div className='video-idx-item' >
        <h2 className="video-title">{video.title}</h2>

        <img src={video.thumbnail}
             className="thumbnail" />

        <img src={iconURL}
             alt='Add/Remove'
             className="add-remove"
             onClick={ (e) => buttonFn(e, video) } />

        { PlayNow }
      </div>
    )
  }
}

export default VideoIndexItem;
