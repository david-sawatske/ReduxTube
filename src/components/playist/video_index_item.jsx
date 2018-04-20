import React from 'react';

const VideoIndexItem = ({ video }) => {
  return (
    <div>
        <img src={video.thumbnail} />
        <h2>{video.title}</h2>
    </div>
  );
};

export default VideoIndexItem;
