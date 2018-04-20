import React from 'react';

class Player extends React.Component {
  constructor(props) {
      super(props)
  }

  onPlayerReady = () => {
    this.player.playVideo();
  }

  onPlayerStateChange = ({ data }) => {
    const { PLAYING, ENDED } = YT.PlayerState;
    switch(data) {
      case PLAYING:
        console.log('playing');
        break;
      case ENDED:
        this.props.setVidIdx(this.props.currentIndex + 1)
        break;
      default:
    }
  }

  componentDidMount() {
    let current = window.onYouTubePlayerAPIReady;
    window.onYouTubePlayerAPIReady = () => {
      this.initializePlayer();
    }
  }

  initializePlayer = () => {
    const { videoId } = this.props;

    this.player = new YT.Player('video-player', {
      videoId: videoId,
      height: '360',
      width: '640',
      controls: '1',
      playerVars: {
        controls: 1,
      },
      events: {
        onReady: this.onPlayerReady,
        onStateChange: this.onPlayerStateChange,
      },
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.videoId !== this.props.videoId) {
      if (!this.player) {
        this.initializePlayer();
      } else {
        this.player.loadVideoById(this.props.videoId);
      }
    }
  }

  render() {
    return (
      <div className='video-container'>
        <div id="video-player"></div>
      </div>
    )
  }
}

export default Player;
