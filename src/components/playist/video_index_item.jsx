import React from 'react';

const VideoIndexItem = ({ video, buttonFn, buttonDisplay }) => (
  <div>
      <img src={video.thumbnail} />
      <h2>{video.title}</h2>

      <button className="nav-btn" onClick={ (e) => buttonFn(e, video) }>
        { buttonDisplay }
      </button>
  </div>
);

export default VideoIndexItem;
