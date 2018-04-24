import React from 'react';

class Player extends React.Component {
  constructor(props) {
      super(props)
  }

  onPlayerReady = () => {
    this.player.playVideo();
  }

  onPlayerStateChange = ({ data }) => {
    const { ENDED } = YT.PlayerState;
    switch(data) {
      case ENDED:
        this.props.setVidIdx(null, this.props.currentIndex + 1)
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
      controls: '1',
      playerVars: {
        rel: 0,
        showinfo: 0,
        iv_load_policy: 3,
        modestbranding: 1,
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
