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
      PlayNow = <img src={ iconURLBase + 'v1524351088/play_c5dbki.png'}
                     className='play'
                     alt='play'/>
    }

    return (
      <div className='video-idx-item' >
        <h2 className="video-title">{video.title}</h2>
        <img src={video.thumbnail}
             className="thumbnail" />

        <img src={iconURL} onClick={ (e) => buttonFn(e, video) }
                           className="add-remove"
                           alt='Add/Remove' />

        { PlayNow }
      </div>
    )
  }
}

export default VideoIndexItem;
