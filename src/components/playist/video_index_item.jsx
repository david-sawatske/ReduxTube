import React from 'react';

const VideoIndexItem = ({ video, setVidIdx, videoIdx,
                          buttonFn, buttonDisplay }) => {

  let PlayNow
  if (setVidIdx) {
    PlayNow = <button className="nav-btn"
                      onClick={ (e) => setVidIdx(e, videoIdx) }>
              PlayNow
            </button>
  }
  return (
    <div>
        <img src={video.thumbnail} />
        <h2>{video.title}</h2>

        <button className="nav-btn" onClick={ (e) => buttonFn(e, video) }>
          { buttonDisplay }
        </button>

      { PlayNow }
    </div>
  )
};

export default VideoIndexItem;
